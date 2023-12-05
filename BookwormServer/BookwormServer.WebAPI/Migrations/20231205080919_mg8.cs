using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookwormServer.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class mg8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoverFormatEn",
                table: "BookDetails");

            migrationBuilder.DropColumn(
                name: "CoverFormatTr",
                table: "BookDetails");

            migrationBuilder.AddColumn<int>(
                name: "CoverTypeEn",
                table: "BookDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CoverTypeTr",
                table: "BookDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoverTypeEn",
                table: "BookDetails");

            migrationBuilder.DropColumn(
                name: "CoverTypeTr",
                table: "BookDetails");

            migrationBuilder.AddColumn<string>(
                name: "CoverFormatEn",
                table: "BookDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CoverFormatTr",
                table: "BookDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
