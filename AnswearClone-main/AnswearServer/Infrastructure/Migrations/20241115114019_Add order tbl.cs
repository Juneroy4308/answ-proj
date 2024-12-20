using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Addordertbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    OrderStatusId = table.Column<int>(type: "integer", nullable: false),
                    OrderContactInfoId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_Orders_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_Orders_tbl_OrderContactInfo_OrderContactInfoId",
                        column: x => x.OrderContactInfoId,
                        principalTable: "tbl_OrderContactInfo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_Orders_tbl_OrderStatus_OrderStatusId",
                        column: x => x.OrderStatusId,
                        principalTable: "tbl_OrderStatus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tbl_OrderItems",
                columns: table => new
                {
                    ProductVariationId = table.Column<int>(type: "integer", nullable: false),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    Count = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_OrderItems", x => new { x.OrderId, x.ProductVariationId });
                    table.ForeignKey(
                        name: "FK_tbl_OrderItems_tbl_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "tbl_Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_OrderItems_tbl_ProductVariations_ProductVariationId",
                        column: x => x.ProductVariationId,
                        principalTable: "tbl_ProductVariations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_OrderItems_ProductVariationId",
                table: "tbl_OrderItems",
                column: "ProductVariationId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Orders_OrderContactInfoId",
                table: "tbl_Orders",
                column: "OrderContactInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Orders_OrderStatusId",
                table: "tbl_Orders",
                column: "OrderStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Orders_UserId",
                table: "tbl_Orders",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_OrderItems");

            migrationBuilder.DropTable(
                name: "tbl_Orders");
        }
    }
}
