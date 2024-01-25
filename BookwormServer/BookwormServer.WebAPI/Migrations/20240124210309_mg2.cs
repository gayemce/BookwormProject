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
                name: "PaymentMethodEn",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingPrice_Currency",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "ShippingPrice_Value",
                table: "Carts");

            migrationBuilder.RenameColumn(
                name: "TotalPrice_Value",
                table: "Orders",
                newName: "Price_Value");

            migrationBuilder.RenameColumn(
                name: "TotalPrice_Currency",
                table: "Orders",
                newName: "Price_Currency");

            migrationBuilder.RenameColumn(
                name: "PaymentMethodTr",
                table: "Orders",
                newName: "PaymentMethod");

            migrationBuilder.RenameColumn(
                name: "TotalPrice_Value",
                table: "Carts",
                newName: "Price_Value");

            migrationBuilder.RenameColumn(
                name: "TotalPrice_Currency",
                table: "Carts",
                newName: "Price_Currency");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price_Value",
                table: "Orders",
                newName: "TotalPrice_Value");

            migrationBuilder.RenameColumn(
                name: "Price_Currency",
                table: "Orders",
                newName: "TotalPrice_Currency");

            migrationBuilder.RenameColumn(
                name: "PaymentMethod",
                table: "Orders",
                newName: "PaymentMethodTr");

            migrationBuilder.RenameColumn(
                name: "Price_Value",
                table: "Carts",
                newName: "TotalPrice_Value");

            migrationBuilder.RenameColumn(
                name: "Price_Currency",
                table: "Carts",
                newName: "TotalPrice_Currency");

            migrationBuilder.AddColumn<string>(
                name: "PaymentMethodEn",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShippingPrice_Currency",
                table: "Carts",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "ShippingPrice_Value",
                table: "Carts",
                type: "money",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
