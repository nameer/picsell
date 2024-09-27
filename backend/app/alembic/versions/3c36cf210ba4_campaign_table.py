"""Campaign table

Revision ID: 3c36cf210ba4
Revises:
Create Date: 2024-09-27 07:25:44.593866

"""

import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from alembic import op

# revision identifiers, used by Alembic.
revision = "3c36cf210ba4"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "campaign",
        sa.Column("name", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("video_url", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("document_urls", sa.JSON(), nullable=True),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column(
            "status",
            sa.Enum(
                "QUEUED", "PROCESSING", "COMPLETED", "FAILED", name="campaignstatus"
            ),
            nullable=False,
        ),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    op.drop_table("campaign")
    op.execute("DROP TYPE campaignstatus")
