"""Import ten audited public WordPress images into the Astro public directory.

Prefer a user-uploaded, vetted `migration-media.zip`. Otherwise download the
ten exact PUBLIC URLs from the current live WordPress site. Checksums must
match the already-checked archive so HTML/error pages or changed files fail
closed rather than leaking unreviewed content.
"""
from hashlib import sha256
from pathlib import Path
from urllib.request import Request, urlopen
from zipfile import ZipFile
import sys

ROOT = "https://franziska-zimmer.com/wp-content/uploads/"
MEDIA = {
    "2026/02/ACM-DL-Logo-flat-black-URL-small.jpeg": "d3342aca202235ca0b476bedbb8c921af0cbac610d685e2b824f680fd7e5f2ec",
    "2026/02/FranziskaZimmer-002.jpg": "2826537ad647a5970a6cc73df5a7821250f856b71895635b5292c72b9d0ebabb",
    "2026/02/PXL_20231008_104808678_crop-scaled.jpg": "f3951cc4bb996d902cfe24f4317a6b70410648d109efb002603db01ebcbb9e40",
    "2026/02/ResearchGate_logo.svg.png": "8f0983ce7313ee120e770946ba139f001caff914dd9ae3e2e61fddcd929c370a",
    "2026/02/scholar_logo_64dp.png": "eae88e99a79f9c5ad070a32010b7f4824d7bf8527961125cb7f37aa92e0f9bb0",
    "2026/03/9374948530394-300x275.png": "7ca06194155565e937a327547a6f0cf802ad219d8bbe4699aa6a9e82ea292c93",
    "2026/03/9374948530394.png": "9c9cb6c4bedf49d7fa8fb0e7cc840bb32a3fad73fd430e2a9dc3da44d1b6e701",
    "2026/03/cropped-logo2-32x32.png": "3c0a4738facb46dee6e6899f31ee6ce9eff6ef669c55a68210a80738a07242f1",
    "2026/04/LinkedIn_logo.svg_-scaled.png": "dde157460496333b8465dcc1a9e1f96ec2b4a63b5c16807ccbb84d4631631716",
    "2026/04/orcid.png": "3d10ca9d6fb907eba0a862e7eb97625944d18cb8c06b14fd409e8c456c023e8f",
}
ARCHIVE = Path("migration-media.zip")
destination = Path("public/wp-content/uploads")

def validate(relative_path: str, data: bytes) -> bytes:
    expected = MEDIA[relative_path]
    if len(data) > 8_000_000 or sha256(data).hexdigest() != expected:
        sys.exit("Image did not match vetted backup: " + relative_path)
    return data

if ARCHIVE.is_file():
    print("Loading vetted uploaded ZIP")
    with ZipFile(ARCHIVE) as archive:
        expected_names = {"wp-content/uploads/" + name for name in MEDIA}
        entries = set(archive.namelist())
        if entries != expected_names:
            sys.exit("ZIP entries differ from the ten vetted public image paths")
        assets = {name: validate(name, archive.read("wp-content/uploads/" + name)) for name in MEDIA}
else:
    print("No ZIP uploaded. Downloading ten known-public images from live WordPress.")
    assets = {}
    for name in MEDIA:
        url = ROOT + name
        try:
            request = Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; AcademicSiteMigration/1.0)"})
            with urlopen(request, timeout=35) as response:
                data = response.read(8_000_001)
            assets[name] = validate(name, data)
            print("Verified", name)
        except Exception as exc:
            sys.exit("Could not fetch public media: " + name + " (" + str(exc) + "). Upload migration-media.zip and rerun this workflow.")

for name, data in assets.items():
    path = destination / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    print("Saved", path)

if ARCHIVE.exists():
    ARCHIVE.unlink()
print("All ten vetted images imported successfully.")
