using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PartyAgile.API.Migrations
{
    public partial class RolesData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { new Guid("c9670787-e5a8-44bd-9642-e30ba3fd3ea4"), "bccd859c-b618-4f78-9bb3-e55e070aa645", "Planner", null });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { new Guid("df1a1ecd-7d51-4251-97e6-1c90fc7f2d4b"), "7b201528-6ccf-4be2-a718-f109a84b482e", "Vendor", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("c9670787-e5a8-44bd-9642-e30ba3fd3ea4"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("df1a1ecd-7d51-4251-97e6-1c90fc7f2d4b"));
        }
    }
}
