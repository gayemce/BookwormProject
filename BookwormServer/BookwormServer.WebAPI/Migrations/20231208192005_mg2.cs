using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookwormServer.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class mg2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookLanguages_Books_BookId",
                table: "BookLanguages");

            migrationBuilder.DropIndex(
                name: "IX_BookLanguages_BookId",
                table: "BookLanguages");

            migrationBuilder.DropColumn(
                name: "BookId",
                table: "BookLanguages");

            migrationBuilder.CreateIndex(
                name: "IX_Books_BookLanguageId",
                table: "Books",
                column: "BookLanguageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_BookLanguages_BookLanguageId",
                table: "Books",
                column: "BookLanguageId",
                principalTable: "BookLanguages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_BookLanguages_BookLanguageId",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_BookLanguageId",
                table: "Books");

            migrationBuilder.AddColumn<int>(
                name: "BookId",
                table: "BookLanguages",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_BookLanguages_BookId",
                table: "BookLanguages",
                column: "BookId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BookLanguages_Books_BookId",
                table: "BookLanguages",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
