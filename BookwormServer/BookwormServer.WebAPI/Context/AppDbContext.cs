using BookwormServer.WebAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookwormServer.WebAPI.Context;

public sealed class AppDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Data Source=DESKTOP-I7G56NT\\SQLEXPRESS;Initial Catalog=BookwormWebDb;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
    }

    public DbSet<Author> Authors { get; set; }
    public DbSet<Book> Books { get; set; }
    public DbSet<BookCategory> BookCategories { get; set; }
    public DbSet<BookDetail> BookDetails { get; set; }
    public DbSet<BookDiscount> BookDiscounts { get; set; }
    public DbSet<BookLanguage> BookLanguages { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderStatus> OrderStatuses { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<AppUser> AppUsers { get; set; }
    public DbSet<WishList> WishLists { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Ignore<IdentityUserRole<int>>();
        modelBuilder.Ignore<IdentityRoleClaim<int>>();
        modelBuilder.Ignore<IdentityUserClaim<int>>();
        modelBuilder.Ignore<IdentityUserLogin<Guid>>();
        modelBuilder.Ignore<IdentityUserToken<Guid>>();

        //Composite Key - Çoka çok ilişki
        modelBuilder.Entity<BookCategory>().HasKey(p => new { p.BookId, p.CategoryId });

        //Book & BookDetail - Bire bir ilişki
        modelBuilder.Entity<Book>().HasOne(b => b.BookDetail).WithOne(bd => bd.Book).HasForeignKey<BookDetail>(bd => bd.BookId);
        base.OnModelCreating(modelBuilder);

        //DDD - Value Object
        modelBuilder.Entity<Book>().OwnsOne(p => p.Price, price =>
        {
            price.Property(p => p.Value).HasColumnType("money");
            price.Property(p => p.Currency).HasMaxLength(5);
        });

        modelBuilder.Entity<Cart>().OwnsOne(p => p.TotalPrice, price =>
        {
            price.Property(p => p.Value).HasColumnType("money");
            price.Property(p => p.Currency).HasMaxLength(5);
        });

        modelBuilder.Entity<Cart>().OwnsOne(p => p.ShippingPrice, price =>
        {
            price.Property(p => p.Value).HasColumnType("money");
            price.Property(p => p.Currency).HasMaxLength(5);
        });

        modelBuilder.Entity<Order>().OwnsOne(p => p.TotalPrice, price =>
        {
            price.Property(p => p.Value).HasColumnType("money");
            price.Property(p => p.Currency).HasMaxLength(5);
        });
    }
}
