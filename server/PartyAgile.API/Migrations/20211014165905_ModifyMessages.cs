using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PartyAgile.API.Migrations
{
    public partial class ModifyMessages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sender",
                schema: "partyagile",
                table: "Messages");

            migrationBuilder.AddColumn<string>(
                name: "SenderName",
                schema: "partyagile",
                table: "Messages",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.DropColumn(
                name: "SenderName",
                schema: "partyagile",
                table: "Messages");

            migrationBuilder.AddColumn<Guid>(
                name: "Sender",
                schema: "partyagile",
                table: "Messages",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

        }
    }
}
