using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookwormServer.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class mg9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookCovers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookId = table.Column<int>(type: "int", nullable: false),
                    CoverTypeEn = table.Column<int>(type: "int", nullable: false),
                    CoverTypeTr = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookCovers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BookCovers_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookCovers_BookId",
                table: "BookCovers",
                column: "BookId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookCovers");
        }
    }
}
