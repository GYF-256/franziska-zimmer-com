"""One-time import of vetted public WordPress images from a small ZIP.

The archive must be prepared from the site's published media only. It must
contain entries starting wp-content/uploads/YYYY/MM/ and no WordPress PHP,
plugins, database backups, logs or credentials.
"""
from pathlib import Path
import re
import sys
import zipfile

ARCHIVE = Path("migration-media.zip")
PUBLIC = Path("public")
PATTERN = re.compile(r"wp-content/uploads/20\d{2}/\d{2}/[A-Za-z0-9_.-]+\.(?:png|jpg|jpeg|webp|gif|svg)", re.I)

if not ARCHIVE.is_file():
    sys.exit("migration-media.zip not found in the repository root. Upload the vetted ZIP first.")

with zipfile.ZipFile(ARCHIVE) as archive:
    entries = [entry for entry in archive.infolist() if not entry.is_dir()]
    if not entries or len(entries) > 100:
        sys.exit("Expected 1 to 100 public media files.")
    if sum(item.file_size for item in entries) > 40_000_000:
        sys.exit("Archive expands beyond the 40 MB safety limit.")

    for item in entries:
        name = item.filename
        if not PATTERN.fullmatch(name) or item.file_size > 8_000_000:
            sys.exit(f"Rejected potentially unsafe archive path: {name!r}")
        target = PUBLIC / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(archive.read(item))
        print("Imported", target)

ARCHIVE.unlink()
print("Public media copied and input archive removed from working tree.")
