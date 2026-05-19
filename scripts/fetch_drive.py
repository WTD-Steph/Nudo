"""Pull a public Google Drive folder, sanitizing Windows-illegal filename chars.

gdown 6's `download_folder(skip_download=True)` returns a flat list of
GoogleDriveFileToDownload entries with `id` and `path` (relative to the
root folder). We rebuild the tree under `dest`, replacing any character
forbidden by Windows (\\ / : * ? " < > |) with " - " in every path
component before creating it.

Usage:
    py scripts/fetch_drive.py <folder_url_or_id> <dest_dir>
"""

from __future__ import annotations

import re
import sys
import time
from pathlib import Path

import gdown

ILLEGAL = re.compile(r'[:*?"<>|]+')


def sanitize_part(name: str) -> str:
    cleaned = ILLEGAL.sub(" - ", name).strip().rstrip(".")
    return cleaned or "_"


def sanitize_path(rel: str) -> Path:
    # gdown emits backslash-joined Windows paths; split on both separators.
    parts = re.split(r"[\\/]", rel)
    return Path(*(sanitize_part(p) for p in parts if p))


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    url, dest = sys.argv[1], Path(sys.argv[2]).resolve()
    dest.mkdir(parents=True, exist_ok=True)

    print("Listing folder…")
    entries = gdown.download_folder(url=url, skip_download=True, quiet=True)
    print(f"Found {len(entries)} files.")

    fail = 0
    for i, entry in enumerate(entries, 1):
        out = dest / sanitize_path(entry.path)
        if out.exists() and out.stat().st_size > 0:
            print(f"[{i}/{len(entries)}] skip: {out.relative_to(dest)}")
            continue
        out.parent.mkdir(parents=True, exist_ok=True)
        print(f"[{i}/{len(entries)}] {out.relative_to(dest)}")
        # Drive throttles anonymous downloads at ~50/15min; retry with
        # exponential backoff so a transient block doesn't lose the whole
        # remainder.
        delay = 2
        for attempt in range(4):
            try:
                gdown.download(id=entry.id, output=str(out), quiet=True)
                break
            except Exception as e:
                if attempt == 3:
                    print(f"  ! {e}", file=sys.stderr)
                    fail += 1
                    break
                print(f"  … retry in {delay}s ({e.__class__.__name__})", file=sys.stderr)
                time.sleep(delay)
                delay *= 3

    print(f"\nDone. {len(entries) - fail}/{len(entries)} downloaded.")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
