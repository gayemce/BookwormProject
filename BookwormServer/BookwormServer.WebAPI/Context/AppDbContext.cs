using BookwormServer.WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BookwormServer.WebAPI.Context;

public sealed class AppDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Data Source=DESKTOP-I7G56NT\\SQLEXPRESS;Initial Catalog=BookwormDb;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
    }

    public DbSet<Book> Books { get; set; }
}
