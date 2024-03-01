using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookwormServer.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class mg17 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "DiscountedPrice",
                table: "BookDiscounts",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiscountedPrice",
                table: "BookDiscounts");
        }
    }
}
