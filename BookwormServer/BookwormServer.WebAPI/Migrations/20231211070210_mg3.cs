using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookwormServer.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class mg3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PublicationCityCountry",
                table: "BookDetails",
                newName: "PublicationCityCountryTr");

            migrationBuilder.AddColumn<string>(
                name: "PublicationCityCountryEn",
                table: "BookDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicationCityCountryEn",
                table: "BookDetails");

            migrationBuilder.RenameColumn(
                name: "PublicationCityCountryTr",
                table: "BookDetails",
                newName: "PublicationCityCountry");
        }
    }
}
