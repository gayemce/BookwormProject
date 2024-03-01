using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookwormServer.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class mg16 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Reviews_AppUserId",
                table: "Reviews",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_AppUsers_AppUserId",
                table: "Reviews",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_AppUsers_AppUserId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_AppUserId",
                table: "Reviews");
        }
    }
}
