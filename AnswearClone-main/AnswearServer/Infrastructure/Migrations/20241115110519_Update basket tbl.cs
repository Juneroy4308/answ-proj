using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Updatebaskettbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Basket_tbl_ProductVariations_ProductId",
                table: "tbl_Basket");

            migrationBuilder.DropIndex(
                name: "IX_tbl_Basket_ProductId",
                table: "tbl_Basket");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "tbl_Basket");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Basket_ProductVariationId",
                table: "tbl_Basket",
                column: "ProductVariationId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Basket_tbl_ProductVariations_ProductVariationId",
                table: "tbl_Basket",
                column: "ProductVariationId",
                principalTable: "tbl_ProductVariations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Basket_tbl_ProductVariations_ProductVariationId",
                table: "tbl_Basket");

            migrationBuilder.DropIndex(
                name: "IX_tbl_Basket_ProductVariationId",
                table: "tbl_Basket");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "tbl_Basket",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Basket_ProductId",
                table: "tbl_Basket",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Basket_tbl_ProductVariations_ProductId",
                table: "tbl_Basket",
                column: "ProductId",
                principalTable: "tbl_ProductVariations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
