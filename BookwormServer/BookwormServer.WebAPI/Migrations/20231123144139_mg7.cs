using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookwormServer.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class mg7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Language",
                table: "BookDetails",
                newName: "LanguageTr");

            migrationBuilder.AddColumn<string>(
                name: "LanguageEn",
                table: "BookDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "LanguageId",
                table: "BookDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LanguageEn",
                table: "BookDetails");

            migrationBuilder.DropColumn(
                name: "LanguageId",
                table: "BookDetails");

            migrationBuilder.RenameColumn(
                name: "LanguageTr",
                table: "BookDetails",
                newName: "Language");
        }
    }
}
