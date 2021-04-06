using Microsoft.EntityFrameworkCore.Migrations;

namespace PartyAgile.API.Migrations
{
    public partial class AddColorToStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ColorStatus",
                schema: "partyagile",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ColorStatus",
                schema: "partyagile",
                table: "Tasks");
        }
    }
}
