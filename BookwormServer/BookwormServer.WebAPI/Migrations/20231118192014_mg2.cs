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
            migrationBuilder.DropColumn(
                name: "ShippingPriceEn_Currency",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "ShippingPriceEn_Value",
                table: "Carts");

            migrationBuilder.RenameColumn(
                name: "ShippingPriceTr_Value",
                table: "Carts",
                newName: "ShippingPrice_Value");

            migrationBuilder.RenameColumn(
                name: "ShippingPriceTr_Currency",
                table: "Carts",
                newName: "ShippingPrice_Currency");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShippingPrice_Value",
                table: "Carts",
                newName: "ShippingPriceTr_Value");

            migrationBuilder.RenameColumn(
                name: "ShippingPrice_Currency",
                table: "Carts",
                newName: "ShippingPriceTr_Currency");

            migrationBuilder.AddColumn<string>(
                name: "ShippingPriceEn_Currency",
                table: "Carts",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "ShippingPriceEn_Value",
                table: "Carts",
                type: "money",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
