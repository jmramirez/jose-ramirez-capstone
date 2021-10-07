using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PartyAgile.API.Migrations
{
    public partial class RemoveBudgetFromVendor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Budget",
                schema: "partyagile",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "DepositPaid",
                schema: "partyagile",
                table: "Vendors");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<string>(
                name: "Budget",
                schema: "partyagile",
                table: "Vendors",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DepositPaid",
                schema: "partyagile",
                table: "Vendors",
                type: "nvarchar(max)",
                nullable: true);

        }
    }
}
