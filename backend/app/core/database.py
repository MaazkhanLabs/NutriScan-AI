import os
import sqlite3
import json
from pathlib import Path
from typing import Optional, List, Dict, Any

try:
    import asyncpg
except ImportError:
    asyncpg = None

class DatabaseWrapper:
    def __init__(self):
        self.use_postgres = False
        self.pool = None
        self.db_path = Path(__file__).parent.parent / "nutriscan.db"

    async def connect(self):
        db_url = os.getenv("DATABASE_URL", "")
        if db_url.startswith("postgresql") and asyncpg:
            try:
                self.pool = await asyncpg.create_pool(db_url, timeout=3.0)
                self.use_postgres = True
                await self.init_postgres_tables()
                print("Connected to PostgreSQL database.")
                return
            except Exception as e:
                print(f"PostgreSQL connection failed ({e}), falling back to SQLite.")
                self.use_postgres = False

        # SQLite Fallback
        self.init_sqlite_tables()
        print(f"Using SQLite database at {self.db_path}")

    def get_sqlite_conn(self):
        conn = sqlite3.connect(str(self.db_path))
        conn.row_factory = sqlite3.Row
        return conn

    def init_sqlite_tables(self):
        conn = self.get_sqlite_conn()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                goal TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS food_scans (
                id TEXT PRIMARY KEY,
                user_id INTEGER,
                detected_food TEXT NOT NULL,
                confidence REAL,
                calories REAL,
                protein_g REAL,
                carbs_g REAL,
                fat_g REAL,
                health_score INTEGER,
                category TEXT,
                nutrition_json TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS food_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                calories REAL,
                protein_g REAL,
                carbs_g REAL,
                fat_g REAL
            )
        """)
        conn.commit()
        conn.close()

    async def init_postgres_tables(self):
        async with self.pool.acquire() as conn:
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    goal VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                CREATE TABLE IF NOT EXISTS food_scans (
                    id VARCHAR(255) PRIMARY KEY,
                    user_id INT,
                    detected_food VARCHAR(255) NOT NULL,
                    confidence FLOAT,
                    calories FLOAT,
                    protein_g FLOAT,
                    carbs_g FLOAT,
                    fat_g FLOAT,
                    health_score INT,
                    category VARCHAR(255),
                    nutrition_json TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                CREATE TABLE IF NOT EXISTS food_items (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    calories FLOAT,
                    protein_g FLOAT,
                    carbs_g FLOAT,
                    fat_g FLOAT
                );
            """)

    async def disconnect(self):
        if self.use_postgres and self.pool:
            await self.pool.close()

    def get_pool(self):
        return self

    async def fetch_one(self, query: str, *args):
        if self.use_postgres and self.pool:
            async with self.pool.acquire() as connection:
                row = await connection.fetchrow(query, *args)
                return dict(row) if row else None
        else:
            sql_query = query
            for i in range(len(args), 0, -1):
                sql_query = sql_query.replace(f"${i}", "?")
            conn = self.get_sqlite_conn()
            cursor = conn.cursor()
            cursor.execute(sql_query, args)
            row = cursor.fetchone()
            conn.close()
            return dict(row) if row else None

    async def fetch_val(self, query: str, *args):
        if self.use_postgres and self.pool:
            async with self.pool.acquire() as connection:
                return await connection.fetchval(query, *args)
        else:
            sql_query = query
            if "RETURNING id" in sql_query:
                sql_query = sql_query.replace("RETURNING id", "")
            for i in range(len(args), 0, -1):
                sql_query = sql_query.replace(f"${i}", "?")
            conn = self.get_sqlite_conn()
            cursor = conn.cursor()
            cursor.execute(sql_query, args)
            conn.commit()
            last_id = cursor.lastrowid
            conn.close()
            return last_id

    async def fetch_all(self, query: str, *args):
        if self.use_postgres and self.pool:
            async with self.pool.acquire() as connection:
                rows = await connection.fetch(query, *args)
                return [dict(r) for r in rows]
        else:
            sql_query = query
            for i in range(len(args), 0, -1):
                sql_query = sql_query.replace(f"${i}", "?")
            conn = self.get_sqlite_conn()
            cursor = conn.cursor()
            cursor.execute(sql_query, args)
            rows = cursor.fetchall()
            conn.close()
            return [dict(r) for r in rows]

    async def execute(self, query: str, *args):
        if self.use_postgres and self.pool:
            async with self.pool.acquire() as connection:
                return await connection.execute(query, *args)
        else:
            sql_query = query
            for i in range(len(args), 0, -1):
                sql_query = sql_query.replace(f"${i}", "?")
            conn = self.get_sqlite_conn()
            cursor = conn.cursor()
            cursor.execute(sql_query, args)
            conn.commit()
            conn.close()
            return cursor.rowcount

db = DatabaseWrapper()

def get_db():
    return db