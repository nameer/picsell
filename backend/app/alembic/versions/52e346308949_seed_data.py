"""Seed data

Revision ID: 52e346308949
Revises: 883ea54fc7a1
Create Date: 2024-09-28 02:17:19.492189

"""

from alembic import op

# revision identifiers, used by Alembic.
revision = "52e346308949"
down_revision = "883ea54fc7a1"
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
    INSERT INTO campaign (name, video_url, video_duration, document_urls, status, created_at, updated_at)
    VALUES ('Campaign 1', 'https://pic-uploadz.s3.ap-south-1.amazonaws.com/Gumlet.mp4', 80, '["https://www.example.com/1", "https://www.example.com/2"]', 'COMPLETED', NOW(), NOW())
    """)

    op.execute("""
    INSERT INTO campaign (name, video_url, video_duration, document_urls, status, created_at, updated_at)
    VALUES ('Campaign 2', 'https://pic-uploadz.s3.ap-south-1.amazonaws.com/Gumlet.mp4', 80, '["https://www.example.com/1", "https://www.example.com/2"]', 'PROCESSING', NOW(), NOW())
    """)

    op.execute("""
    INSERT INTO campaign (name, video_url, video_duration, document_urls, status, created_at, updated_at)
    VALUES ('Campaign 3', null, null, '["https://www.example.com/1", "https://www.example.com/2"]', 'DRAFTED', NOW(), NOW())
    """)

    op.execute("""
    INSERT INTO campaign (name, video_url, video_duration, document_urls, status, created_at, updated_at)
    VALUES ('Campaign 4', null, null, '["https://www.example.com/1", "https://www.example.com/2"]', 'DRAFTED', NOW(), NOW())
    """)


def downgrade():
    op.execute("DELETE FROM campaign")
