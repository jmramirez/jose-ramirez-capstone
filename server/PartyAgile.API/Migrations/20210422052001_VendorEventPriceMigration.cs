using Microsoft.EntityFrameworkCore.Migrations;

namespace PartyAgile.API.Migrations
{
    public partial class VendorEventPriceMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Budget",
                schema: "partyagile",
                table: "EventVendors",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DepositPaid",
                schema: "partyagile",
                table: "EventVendors",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Budget",
                schema: "partyagile",
                table: "EventVendors");

            migrationBuilder.DropColumn(
                name: "DepositPaid",
                schema: "partyagile",
                table: "EventVendors");
        }
    }
}
