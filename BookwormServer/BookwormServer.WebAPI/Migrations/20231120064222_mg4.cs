using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookwormServer.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class mg4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiscountBooks_Books_BookId",
                table: "DiscountBooks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DiscountBooks",
                table: "DiscountBooks");

            migrationBuilder.RenameTable(
                name: "DiscountBooks",
                newName: "BookDiscounts");

            migrationBuilder.RenameIndex(
                name: "IX_DiscountBooks_BookId",
                table: "BookDiscounts",
                newName: "IX_BookDiscounts_BookId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookDiscounts",
                table: "BookDiscounts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BookDiscounts_Books_BookId",
                table: "BookDiscounts",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookDiscounts_Books_BookId",
                table: "BookDiscounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookDiscounts",
                table: "BookDiscounts");

            migrationBuilder.RenameTable(
                name: "BookDiscounts",
                newName: "DiscountBooks");

            migrationBuilder.RenameIndex(
                name: "IX_BookDiscounts_BookId",
                table: "DiscountBooks",
                newName: "IX_DiscountBooks_BookId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DiscountBooks",
                table: "DiscountBooks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscountBooks_Books_BookId",
                table: "DiscountBooks",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
