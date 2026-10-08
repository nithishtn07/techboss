import os
import io
import zipfile
import tarfile
import urllib.request
import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
PGSQL_DIR = BASE_DIR / "pgsql"
DATA_DIR = PGSQL_DIR / "data"
BIN_DIR = PGSQL_DIR / "bin"
URL = "https://repo1.maven.org/maven2/io/zonky/test/postgres/embedded-postgres-binaries-windows-amd64/16.2.0/embedded-postgres-binaries-windows-amd64-16.2.0.jar"

def setup_postgres():
    if not (BIN_DIR / "postgres.exe").exists():
        print("Downloading portable PostgreSQL 16 binaries (22MB)...")
        req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as resp:
            jar_data = resp.read()
        
        print("Extracting JAR...")
        with zipfile.ZipFile(io.BytesIO(jar_data)) as z:
            txz_data = z.read("postgres-windows-x86_64.txz")
            
        print("Extracting PostgreSQL archive...")
        PGSQL_DIR.mkdir(parents=True, exist_ok=True)
        with tarfile.open(fileobj=io.BytesIO(txz_data), mode="r:xz") as t:
            t.extractall(path=PGSQL_DIR)
        print("PostgreSQL binaries extracted to:", PGSQL_DIR)
    else:
        print("PostgreSQL binaries already present.")

    if not DATA_DIR.exists():
        print("Initializing database cluster with initdb...")
        initdb_exe = BIN_DIR / "initdb.exe"
        cmd = [
            str(initdb_exe),
            "-D", str(DATA_DIR),
            "-U", "postgres",
            "-A", "trust",
            "-E", "UTF8",
            "--locale=C"
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        print("initdb result code:", res.returncode)
        if res.returncode != 0:
            print("initdb error:", res.stderr)
            raise RuntimeError(res.stderr)
        print("Database cluster initialized successfully at:", DATA_DIR)
    else:
        print("Database cluster already exists at:", DATA_DIR)

if __name__ == "__main__":
    setup_postgres()
