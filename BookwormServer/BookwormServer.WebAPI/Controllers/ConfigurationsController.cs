using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public sealed class ConfigurationsController : ControllerBase
{
    private readonly AppDbContext context = new();

    public static List<Author> GetAuthors()
    {
        List<Author> authors = new();

        for (int i = 0; i < 100; i++)
        {
            Author author = new Author()
            {
                Name = $"Yazar {i}",
                Lastname = $"Yazar Soyadı",
                AboutTr = $"Yazar Hakkında {i}",
                AboutEn = $"Author About {i}",
                ProfileImgUrl = "https://upload.wikimedia.org/wikipedia/commons/2/2d/Jack_London_young.jpg",
                PublishedBooksCount = i,
                isActive = true,
            };

            authors.Add(author);
        }

        return authors;
    }

    public static List<BookLanguage> GetBookLanguages()
    {
        List<BookLanguage> bookLanguages = new();

        for (int i = 0; i < 2; i++)
        {
            BookLanguage bookLanguage = new()
            {
                NameEn = $"Language {i}",
                NameTr = $"Dil {i}"
            };

            bookLanguages.Add(bookLanguage);
        }

        return bookLanguages;
    }

    public static List<BookDetail> GetBookDetails()
    {
        List<BookDetail> bookDetails = new();

        for (int i = 0; i < 100; i++)
        {
            BookDetail bookDetail = new()
            {
                Page = i + i,
                PublicationCityCountryTr = "Paris, Fransa",
                PublicationCityCountryEn = "Paris, France",
                PublicationDate = "1945",
                ISBN = $"000{i}",
            };

            bookDetails.Add(bookDetail);
        }

        return bookDetails;
    }

    public static List<Category> GetCategories()
    {
        List<Category> categories = new();

        for (int i = 0; i < 10; i++)
        {
            Category category = new()
            {
                NameTr = $"Kategori {i}",
                NameEn = $"Category {i}",
                IconImgUrl = "https://cdn-icons-png.flaticon.com/512/3405/3405802.png",
                IsActive = true,
                IsDeleted = false,
            };

            categories.Add(category);
        }

        return categories;
    }


    [HttpGet]
    public IActionResult SeedData()
    {
        List<Author> authors = GetAuthors();
        context.Authors.AddRange(authors);
        context.SaveChanges();

        List<BookLanguage> languages = GetBookLanguages();
        context.BookLanguages.AddRange(languages);
        context.SaveChanges();

        List<Category> categories = GetCategories();
        context.Categories.AddRange(categories);
        context.SaveChanges();

        List<Book> books = new();
        for(int i = 0; i < 100; i++)
        {
            Book book = new Book()
            {
                Title = $"Kitap {i}",
                AuthorId = authors[i].Id,
                BookLanguageId = languages[new Random().Next(0, languages.Count)].Id,
                DescriptionTr = $"Açıklama açıklama açıklama {i}",
                DescriptionEn = $"Description description description {i}",
                ImgUrl = "https://cdn.bkmkitap.com/martin-eden-134847-12224352-13-B.png",
                Price = new(i + 2, "₺"),
                Quantity = i * 1,
                IsActive = true,
                IsDeleted = false,
                IsFeatured = false,
                CreatedAt = DateTime.Now,
                Publisher = $"Kültür yayınları {i}",

            };

            books.Add(book);
        }

        context.Books.AddRange(books);
        context.SaveChanges();

            List<BookCategory> bookCategories = new();
            foreach(var book in books)
            {
                BookCategory bookCategory = new()
                {
                    BookId = book.Id,
                    CategoryId = categories[new Random().Next(0, categories.Count)].Id,
                };

                bookCategories.Add(bookCategory);
            }

        context.BookCategories.AddRange(bookCategories);
        context.SaveChanges();

            List<BookDetail> bookDetails = new();
            foreach (var book in books)
            {
                BookDetail bookDetail = new()
                {
                    BookId = book.Id,
                    Page = 1,
                    PublicationCityCountryTr = "Paris, Fransa",
                    PublicationCityCountryEn = "Paris, France",
                    PublicationDate = "1945",
                    ISBN = $"000",
                };

                bookDetails.Add(bookDetail);
            }

        context.BookDetails.AddRange(bookDetails);
        context.SaveChanges();


        return NoContent();
    }

}
