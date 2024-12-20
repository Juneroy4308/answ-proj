using Bogus;
using Bogus.DataSets;
using Core.Constants;
using Core.Entities;
using Core.Entities.Discount;
using Core.Entities.Filters;
using Core.Entities.Identity;
using Core.Entities.Orders;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Infrastructure.Data;

public class AppDbSeeder(
    AppDbContext context,
    IConfiguration configuration,
    ISlugService slugService,
    IImageService imageService,
    UserManager<UserEntity> userManager,
    RoleManager<RoleEntity> roleManager
    ) : IAppDbSeeder
{
    public async Task SeedAsync()
    {
        await context.Database.MigrateAsync();

        using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            if (!await context.OrderStatuses.AnyAsync())
                await CreateOrderStatusesAsync();

            if (!await context.UserRoles.AnyAsync())
                await CreateUserRolesAsync();

            if (!await context.Users.AnyAsync())
                await CreateUserAsync();

            if (!await context.TargetGroups.AnyAsync())
                await CreateTargetGroupsAsync();

            if (!await context.Discounts.AnyAsync())
                await CreateDiscountsAsync();

            if (!await context.Categories.AnyAsync())
            {
                await CreateParentCategoryAsync();
                await CreateChildrenCategoryAsync();
            }

            if (!await context.FilterValues.AnyAsync())
                await CreateFiltersAsync();

            if (!await context.Products.AnyAsync())
            {
                await CreateProductsAsync();
                //await GenerateProductsWithBogusAsync();
            }

            await transaction.CommitAsync();
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
    private async Task CreateUserRolesAsync()
    {
        foreach (var roleName in Roles.All)
        {
            await roleManager.CreateAsync(new RoleEntity
            {
                Name = roleName
            });
        }
    }
    private async Task CreateUserAsync()
    {
        var user = new UserEntity
        {
            FirstName = "Super",
            LastName = "Admin",
            Email = configuration["Admin:Email"]
                ?? throw new NullReferenceException("Admin:Email"),
            UserName = "superadmin",
        };

        IdentityResult result = await userManager.CreateAsync(
            user,
            configuration["Admin:Password"]
                ?? throw new NullReferenceException("Admin:Password")
        );

        if (!result.Succeeded)
            throw new Exception("Error creating admin account");

        result = await userManager.AddToRoleAsync(user, Roles.Admin);

        if (!result.Succeeded)
            throw new Exception("Role assignment error");
    }

    private async Task CreateOrderStatusesAsync()
    {
        var defaultOrderStatuses = configuration?
            .GetSection("DefaultSeedData:OrderStatuses")
            .Get<string[]>();

        if (defaultOrderStatuses is null || !defaultOrderStatuses.Any())
            throw new Exception("DefaultSeedData:OrderStatuses is invalid");

        var orderStatuses = new List<OrderStatusEntity>();

        foreach (var status in defaultOrderStatuses)
        {
            var orderStatus = new OrderStatusEntity
            {
                Name = status
            };

            orderStatuses.Add(orderStatus);
        }

        context.OrderStatuses.AddRange(orderStatuses);
        await context.SaveChangesAsync();
    }


    private async Task CreateTargetGroupsAsync()
    {
        var defaultTargetGroups = configuration?
                    .GetSection("DefaultSeedData:TargetGroups")
                    .Get<string[]>();

        if (defaultTargetGroups is null)
            throw new Exception("DefaultSeedData:TargetGroups is invalid");

        var targetGroups = new List<TargetGroupEntity>();

        foreach (var group in defaultTargetGroups)
        {
            var targetGroup = new TargetGroupEntity
            {
                Name = group,
                Slug = slugService.GenerateSlug(group),
            };

            targetGroups.Add(targetGroup);
        }

        context.TargetGroups.AddRange(targetGroups);
        await context.SaveChangesAsync();
    }
    private async Task CreateParentCategoryAsync()
    {
        var defaultParentCategories = configuration?
                    .GetSection("DefaultSeedData:ParentCategories")
                    .Get<string[]>();

        if (defaultParentCategories is null)
            throw new Exception("DefaultSeedData:ParentCategories is invalid");

        var parentCategoriesGroups = new List<CategoryEntity>();

        var adultsTargetGroups = context.TargetGroups.Where(g => !g.Name.Equals("Діти")).ToList();

        foreach (var adultsGroup in adultsTargetGroups)
        {
            foreach (var category in defaultParentCategories)
            {
                var newCategory = new CategoryEntity
                {
                    Name = category,
                    Slug = slugService.GenerateSlug(category + adultsGroup.Id),
                    TargetGroup = adultsGroup,
                };

                parentCategoriesGroups.Add(newCategory);
            }
        }
        context.Categories.AddRange(parentCategoriesGroups);

        await context.SaveChangesAsync();
    }
    private async Task CreateChildrenCategoryAsync()
    {
        var manFootwearCategories = configuration?
                    .GetSection("DefaultSeedData:ManFootwearCategories")
                    .Get<string[]>();

        var womanFootwearCategories = configuration?
                   .GetSection("DefaultSeedData:WomenFootwearCategories")
                   .Get<string[]>();

        var manClothesCategories = configuration?
                   .GetSection("DefaultSeedData:ManClothesCategories")
                   .Get<string[]>();

        var womanClothesCategories = configuration?
                   .GetSection("DefaultSeedData:WomanClothesCategories")
                   .Get<string[]>();

        var manAccessoriesCategories = configuration?
                   .GetSection("DefaultSeedData:ManAccessoriesCategories")
                   .Get<string[]>();

        var womanAccessoriesCategories = configuration?
                   .GetSection("DefaultSeedData:WomanAccessoriesCategories")
                   .Get<string[]>();

        var womanHomeAndLifestyleCategories = configuration?
                   .GetSection("DefaultSeedData:WomanHomeAndLifestyleCategories")
                   .Get<string[]>();

        var manHomeAndLifestyleCategories = configuration?
                   .GetSection("DefaultSeedData:ManHomeAndLifestyleCategories")
                   .Get<string[]>();

        if (manFootwearCategories is null || womanFootwearCategories is null)
            throw new Exception("DefaultSeedData:WomanFootwearCategories or ManFootwearCategories is invalid");

        if (manClothesCategories is null || womanClothesCategories is null)
            throw new Exception("DefaultSeedData:WomanClothesCategories or ManClothesCategories is invalid");

        if (manAccessoriesCategories is null || womanAccessoriesCategories is null)
            throw new Exception("DefaultSeedData:ManAccessoriesCategories or WomanAccessoriesCategories is invalid");

        if (manHomeAndLifestyleCategories is null || womanHomeAndLifestyleCategories is null)
            throw new Exception("DefaultSeedData:ManHomeAndLifestyleCategories or WomanHomeAndLifestyleCategories is invalid");

        var parentCategories = context.Categories
            .Include(x => x.TargetGroup)
            .Where(c => c.ParentId == null).ToList();

        var listCategories = new List<CategoryEntity>();

        foreach (var category in parentCategories)
        {
            if (category.Name == "Взуття" && category.TargetGroup.Name == "Він")
            {

                foreach (var manCategoryName in manFootwearCategories)
                {
                    var manCategory = new CategoryEntity
                    {
                        Name = manCategoryName,
                        Slug = slugService.GenerateSlug(manCategoryName + category.TargetGroupId),
                        TargetGroupId = category.TargetGroupId,
                        ParentId = category.Id,
                    };

                    listCategories.Add(manCategory);
                }

            }
            if (category.Name == "Взуття" && category.TargetGroup.Name == "Вона")
            {

                foreach (var womanCategoryName in womanFootwearCategories)
                {
                    var womanCategory = new CategoryEntity
                    {
                        Name = womanCategoryName,
                        Slug = slugService.GenerateSlug(womanCategoryName + category.TargetGroupId),
                        TargetGroupId = category.TargetGroupId,
                        ParentId = category.Id,
                    };

                    listCategories.Add(womanCategory);
                }

            }
            if (category.Name == "Одяг" && category.TargetGroup.Name == "Вона")
            {

                foreach (var womanCategoryName in womanClothesCategories)
                {
                    var womanCategory = new CategoryEntity
                    {
                        Name = womanCategoryName,
                        Slug = slugService.GenerateSlug(womanCategoryName + category.TargetGroupId),
                        TargetGroupId = category.TargetGroupId,
                        ParentId = category.Id,
                    };

                    listCategories.Add(womanCategory);
                }

            }
            if (category.Name == "Одяг" && category.TargetGroup.Name == "Він")
            {

                foreach (var manCategoryName in manClothesCategories)
                {
                    var manCategory = new CategoryEntity
                    {
                        Name = manCategoryName,
                        Slug = slugService.GenerateSlug(manCategoryName + category.TargetGroupId),
                        TargetGroupId = category.TargetGroupId,
                        ParentId = category.Id,
                    };

                    listCategories.Add(manCategory);
                }

            }
            if (category.Name == "Аксесуари" && category.TargetGroup.Name == "Він")
            {

                foreach (var manCategoryName in manAccessoriesCategories)
                {
                    var manCategory = new CategoryEntity
                    {
                        Name = manCategoryName,
                        Slug = slugService.GenerateSlug(manCategoryName + category.TargetGroupId),
                        TargetGroupId = category.TargetGroupId,
                        ParentId = category.Id,
                    };

                    listCategories.Add(manCategory);
                }

            }
            if (category.Name == "Аксесуари" && category.TargetGroup.Name == "Вона")
            {

                foreach (var womanCategoryName in womanAccessoriesCategories)
                {
                    var womanCategory = new CategoryEntity
                    {
                        Name = womanCategoryName,
                        Slug = slugService.GenerateSlug(womanCategoryName + category.TargetGroupId),
                        TargetGroupId = category.TargetGroupId,
                        ParentId = category.Id,
                    };

                    listCategories.Add(womanCategory);
                }

            }
            if (category.Name == "Дім & Лайфстайл" && category.TargetGroup.Name == "Вона")
            {

                foreach (var womanCategoryName in womanHomeAndLifestyleCategories)
                {
                    var womanCategory = new CategoryEntity
                    {
                        Name = womanCategoryName,
                        Slug = slugService.GenerateSlug(womanCategoryName + category.TargetGroupId),
                        TargetGroupId = category.TargetGroupId,
                        ParentId = category.Id,
                    };

                    listCategories.Add(womanCategory);
                }

            }
            if (category.Name == "Дім & Лайфстайл" && category.TargetGroup.Name == "Він")
            {

                foreach (var manCategoryName in manHomeAndLifestyleCategories)
                {
                    var manCategory = new CategoryEntity
                    {
                        Name = manCategoryName,
                        Slug = slugService.GenerateSlug(manCategoryName + category.TargetGroupId),
                        TargetGroupId = category.TargetGroupId,
                        ParentId = category.Id,
                    };

                    listCategories.Add(manCategory);
                }

            }
        }

        context.Categories.AddRange(listCategories);

        await context.SaveChangesAsync();
    }
    private async Task CreateDiscountsAsync()
    {

        var file = await imageService.SaveImageFromUrlAsync("https://www.factsmostly.com/wp-content/uploads/2024/08/Summer-Season.webp");



        var discount = new DiscountEntity
        {
            Name = "Summer Sale",
            MediaFile = file,
            DiscountValues = new List<DiscountValueEntity>
            {
                new DiscountValueEntity { Percentage = 37 },
                new DiscountValueEntity { Percentage = 35 },
                new DiscountValueEntity { Percentage = 47 },
                new DiscountValueEntity { Percentage = 55 },
                new DiscountValueEntity { Percentage = 49 }
            }
        };

        context.Discounts.Add(discount);
        await context.SaveChangesAsync();
    }
    private async Task CreateProductsAsync()
    {
        Random random = new Random();

        var categoryJeansMan = context.Categories
            .Where(p => p.Name.Equals("Джинси") && p.TargetGroup.Name.Equals("Він"))
            .FirstOrDefault();

        var categoryJeansWoman = context.Categories
            .Where(p => p.Name.Equals("Джинси") && p.TargetGroup.Name.Equals("Вона"))
            .FirstOrDefault();

        if (categoryJeansMan == null)
            throw new Exception("Category 'Джинси' for 'Він' not found");

        if (categoryJeansWoman == null)
            throw new Exception("Category 'Джинси' for 'Вона' not found");

        var manJeans = new List<ProductEntity>
        {
            new ProductEntity
            {
                Name = "Джинси BOSS",
                Description = "Джинси із колекції BOSS фасону slim із завищеною талією. Модель виготовлена із гладкого деніму.\r\n- Модель із завищеною талією та застібкою на ґудзики і блискавку.\r\n- Спереду три прорізні кишені.\r\n- Дві накладні кишені на сідницях.\r\n- Ширина талії: 39 cm.\r\n- Напівобхват стегон: 47 cm.\r\n- Висота талії: 27 cm.\r\n- Ширина штанини знизу: 16 cm.\r\n- Ширина штанини зверху: 27 cm.\r\n- Зовнішня довжина штанини: 104 cm.\r\n- Параметри вказані для розміру: 31/32.\r\nСклад: 98% Бавовна, 2% Еластан\r\nID Товару: 99KK-SJM0FG_59J\r\nКод виробника: 50524007",
                CategoryId = categoryJeansMan.Id,
                Variations = new List<ProductVariationEntity>
                {
                    new ProductVariationEntity
                    {
                        ShortDescription = "чоловічі колір синій 50524007",
                        Slug = slugService.GenerateSlugWithTime("Джинси BOSS чоловічі колір синій"),
                        Price = 6399,
                        Photos = new List<ProductPhotoEntity>
                        {
                            new ProductPhotoEntity()
                            {
                                Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/AA00-SJM0FG-59J_F1.jpg@webp?v=1716355215"),
                            },
                            new ProductPhotoEntity()
                            {
                                Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/AA00-SJM0FG-59J_F2.jpg@webp?v=1716354371"),
                            },
                            new ProductPhotoEntity()
                            {
                                Name =  await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/AA00-SJM0FG-59J_F3.jpg@webp?v=1716355330"),
                            },
                         }
                    }
                }
            },
            new ProductEntity
            {
                Name = "Джинси Tommy Jeans",
                Description = "Джинси із колекції Tommy Jeans фасону slim із звичайною талією. Модель виготовлена із гладкого деніму. Еластичний, прилягаючий до фігури, матеріал.\r\n- Модель частково виготовлена ​​з переробленої бавовни.\r\n- Фасон slim - джинси із завуженою посадкою та вузькою штаниною в зоні стегна та щиколотки. Підкреслюють природні контури фігури, але не обтягують її - зручні для повсякденного носіння.\r\n- Модель із регулярною талією та застібкою на ґудзики і блискавку.\r\n- Спереду три прорізні кишені.\r\n- Дві накладні кишені на сідницях.\r\n- Ширина талії: 43,5 cm.\r\n- Напівобхват стегон: 55 cm.\r\n- Висота талії: 25 cm.\r\n- Ширина штанини знизу: 18,5 cm.\r\n- Ширина штанини зверху: 29,5 cm.\r\n- Зовнішня довжина штанини: 105 cm.\r\n- Параметри вказані для розміру: 31/32.\r\nСклад: 99% Бавовна, 1% Еластан\r\nID Товару: PPYH-SJM0D7_00J\r\nКод виробника: DM0DM18746",
                CategoryId = categoryJeansMan.Id,
                Variations = new List<ProductVariationEntity>
                {
                    new ProductVariationEntity
                    {
                         ShortDescription = "чоловічі колір білий",
                         Price = 3999,
                         Slug = slugService.GenerateSlugWithTime("Джинси Tommy Jeans чоловічі колір білий"),
                         Photos = new List<ProductPhotoEntity>
                         {
                              new ProductPhotoEntity()
                              {
                                   Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0D7-00J_F1.jpg@webp?v=1714025066"),
                              },
                              new ProductPhotoEntity()
                              {
                                   Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0D7-00J_F2.jpg@webp?v=1714026069"),
                              },
                              new ProductPhotoEntity()
                              {
                                  Name =  await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0D7-00J_F3.jpg@webp?v=1714027713"),
                              },
                         }
                    },
                    new ProductVariationEntity
                    {
                         ShortDescription = "чоловічі колір жовитий",
                         Price = 3500,
                         Slug = slugService.GenerateSlugWithTime("Джинси Tommy Jeans чоловічі колір жовитий"),
                         Photos = new List<ProductPhotoEntity>
                         {
                              new ProductPhotoEntity()
                              {
                                  Name =  await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0D7-00J_F3.jpg@webp?v=1714027713"),
                              },
                         }
                    },
                     new ProductVariationEntity
                    {
                         ShortDescription = "чоловічі колір зелений",
                         Price = 3500,
                         Slug = slugService.GenerateSlugWithTime("Джинси Tommy Jeans чоловічі колір зелений"),
                         Photos = new List<ProductPhotoEntity>
                         {
                              new ProductPhotoEntity()
                              {
                                  Name =  await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0D7-00J_F3.jpg@webp?v=1714027713"),
                              },
                         }
                    }
                }
            },
            new ProductEntity
            {
                Name = "Джинси Tommy Hilfiger",
                Description = "Джинси із колекції Tommy Hilfiger фасону regular із звичайною талією. Модель виготовлена із декоративно випраного деніму.\r\n- Модель частково виготовлена ​​з волокон, вироблених з використанням екологічних виробничих процесів, що зменшує їх вплив на навколишнє середовище.\r\n- Технологія Tech Stretch забезпечує винятковий комфорт використання та стійкість до зминання.\r\n- Модель із регулярною талією та застібкою на ґудзики і блискавку.\r\n- Спереду три прорізні кишені.\r\n- Дві накладні кишені на сідницях.\r\n- Денім з декоративними потертостями.\r\n- Ширина талії: 40 cm.\r\n- Напівобхват стегон: 49 cm.\r\n- Висота талії: 25 cm.\r\n- Ширина штанини знизу: 17 cm.\r\n- Ширина штанини зверху: 29 cm.\r\n- Зовнішня довжина штанини: 103 cm.\r\n- Параметри вказані для розміру: 31/32.\r\nСклад: Матеріал 1: 99% Бавовна, 1% Еластан\r\nМатеріал 2: 69% Бавовна, 30% Перероблена бавовна, 1% Еластан\r\nID Товару: PPYH-SJM0A6_90X\r\nКод виробника: MW0MW35171",
                CategoryId = categoryJeansMan.Id,
                Variations = new List<ProductVariationEntity>
                {
                    new ProductVariationEntity
                    {
                        ShortDescription = "чоловічі",
                        Price = 5599,
                        Slug = slugService.GenerateSlugWithTime("Джинси Tommy Hilfiger чоловічі"),
                        Photos = new List<ProductPhotoEntity>
                        {
                             new ProductPhotoEntity()
                             {
                                  Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0A6-90X_F1.jpg@webp?v=1715423388"),
                             },
                             new ProductPhotoEntity()
                             {
                                  Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0A6-90X_F2.jpg@webp?v=1715423424"),
                             },
                             new ProductPhotoEntity()
                             {
                                 Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0A6-90X_F3.jpg@webp?v=1715423499"),
                             },
                        }
                    },
                    new ProductVariationEntity
                    {
                        ShortDescription = "чоловічі зелені",
                        Price = 6050,
                        Slug = slugService.GenerateSlugWithTime("Джинси Tommy Hilfiger чоловічі зелені"),
                        Photos = new List<ProductPhotoEntity>
                        {
                             new ProductPhotoEntity()
                             {
                                  Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0A6-90X_F1.jpg@webp?v=1715423388"),
                             }
                        }
                    }
                }
            }
        };


        context.Products.AddRange(manJeans);
        await context.SaveChangesAsync();
    }
    private async Task CreateFiltersAsync()
    {
        var categoryWomanJeans = await context.Categories
           .FirstOrDefaultAsync(c => c.TargetGroup.Name.Equals("Вона") && c.Name.Equals("Джинси"));

        var categoryId = categoryWomanJeans.Id;
        var productsInCategory = await context.Products
            .Where(p => p.CategoryId == categoryId)
            .ToListAsync();

        if (categoryWomanJeans == null)
        {
            throw new Exception("Category 'Вона Джинси' не знайдена.");
        }

        var filterNamesWomanJeans = new List<FilterNameEntity>
        {
            new FilterNameEntity { Name = "Вид товару", CategoryId = categoryWomanJeans.Id },
            new FilterNameEntity { Name = "Розмір",  CategoryId = categoryWomanJeans.Id },
            new FilterNameEntity { Name = "Колір",  CategoryId = categoryWomanJeans.Id },
            new FilterNameEntity { Name = "Ціна",  CategoryId = categoryWomanJeans.Id },
            new FilterNameEntity { Name = "Вид асортименту",  CategoryId = categoryWomanJeans.Id },
            new FilterNameEntity { Name = "Planet friendly",  CategoryId = categoryWomanJeans.Id },
            new FilterNameEntity { Name = "Талія",  CategoryId = categoryWomanJeans.Id },
        };

        context.FilterNames.AddRange(filterNamesWomanJeans);
        await context.SaveChangesAsync();

        // Створення Filt erValues
        var filterValuesWomanJeans = new List<FilterValueEntity>
        {
            new FilterValueEntity { Name = "барвистий", FilterName = filterNamesWomanJeans.First(f => f.Name == "Колір") },
            new FilterValueEntity { Name = "бежевий", FilterName = filterNamesWomanJeans.First(f => f.Name == "Колір") },
            new FilterValueEntity { Name = "білий", FilterName = filterNamesWomanJeans.First(f => f.Name == "Колір") },
            new FilterValueEntity { Name = "срібний", FilterName = filterNamesWomanJeans.First(f => f.Name == "Колір") },
            new FilterValueEntity { Name = "темно-синій", FilterName = filterNamesWomanJeans.First(f => f.Name == "Колір") },
            new FilterValueEntity { Name = "фіолетовий", FilterName = filterNamesWomanJeans.First(f => f.Name == "Колір") },
            new FilterValueEntity { Name = "червоний", FilterName = filterNamesWomanJeans.First(f => f.Name == "Колір") },
            new FilterValueEntity { Name = "чорний", FilterName = filterNamesWomanJeans.First(f => f.Name == "Колір") },
            new FilterValueEntity { Name = "XXS", FilterName = filterNamesWomanJeans.First(f => f.Name == "Розмір") },
            new FilterValueEntity { Name = "XXS/32", FilterName = filterNamesWomanJeans.First(f => f.Name == "Розмір") },
            new FilterValueEntity { Name = "XXS/30", FilterName = filterNamesWomanJeans.First(f => f.Name == "Розмір") },
            new FilterValueEntity { Name = "XS", FilterName = filterNamesWomanJeans.First(f => f.Name == "Розмір") },
            new FilterValueEntity { Name = "XS/30", FilterName = filterNamesWomanJeans.First(f => f.Name == "Розмір") },
            new FilterValueEntity { Name = "XS/32", FilterName = filterNamesWomanJeans.First(f => f.Name == "Розмір") },
            new FilterValueEntity { Name = "S", FilterName = filterNamesWomanJeans.First(f => f.Name == "Розмір") },
            new FilterValueEntity { Name = "Wide leg", FilterName = filterNamesWomanJeans.First(f => f.Name == "Вид товару") },
            new FilterValueEntity { Name = "Джинсові комбінезони", FilterName = filterNamesWomanJeans.First(f => f.Name == "Вид товару") },
            new FilterValueEntity { Name = "Розкльошені", FilterName = filterNamesWomanJeans.First(f => f.Name == "Вид товару") },
            new FilterValueEntity { Name = "Джинсові комбінезони", FilterName = filterNamesWomanJeans.First(f => f.Name == "Вид товару") },
        };

        context.FilterValues.AddRange(filterValuesWomanJeans);
        await context.SaveChangesAsync();
    }

    private bool ShouldApplyDiscount(Random random)
    {
        return random.NextDouble() < 0.4;
    }

    private DiscountValueEntity GetRandomDiscountValue(List<DiscountEntity> discounts, Random random)
    {
        var allDiscountValues = discounts.SelectMany(d => d.DiscountValues).ToList();
        if (allDiscountValues.Count == 0)
        {
            throw new Exception("No discount values available");
        }
        return allDiscountValues[random.Next(allDiscountValues.Count)];
    }

    public async Task GenerateProductsWithBogusAsync()
    {
        Random random = new Random();
        Faker faker = new Faker();

        var categoryIds = context.Categories.Select(c => c.Id).ToList();

        var photoFaker = new Faker<ProductPhotoEntity>()
           .RuleFor(p => p.Name, f => f.Image.PicsumUrl(540, 813));

        var variationFaker = new Faker<ProductVariationEntity>()
           .RuleFor(v => v.ShortDescription, f => $"{f.Commerce.ProductAdjective()} {f.Commerce.Color()}")
           .RuleFor(v => v.Price, f => f.Random.Int(3000, 8000))
           .RuleFor(v => v.Slug, (f, v) => slugService.GenerateSlugWithTime(v.ShortDescription));

        var productFaker = new Faker<ProductEntity>()
           .RuleFor(p => p.Name, f => f.Commerce.ProductName())
           .RuleFor(p => p.Description, f => f.Lorem.Paragraphs(1, 3))
           .RuleFor(p => p.CategoryId, f => f.PickRandom(categoryIds))
           .RuleFor(p => p.Variations, f => variationFaker.Generate(f.Random.Int(1, 4)));

        var products = productFaker.Generate(20);


        context.Products.AddRange(products);
        await context.SaveChangesAsync();


        foreach (var product in products)
        {
            foreach (var variation in product.Variations)
            {
                var productPhotos = new List<ProductPhotoEntity>();
                var photoCount = random.Next(1, 3);

                for (int i = 0; i < photoCount; i++)
                {
                    var imageUrl = faker.Image.LoremFlickrUrl(keywords: "clothing", width: 320, height: 480);

                    var productPhoto = new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync(imageUrl),
                        Priority = i,
                        ProductVariationId = variation.Id,
                    };

                    productPhotos.Add(productPhoto);
                }

                context.ProductPhotos.AddRange(productPhotos);
                context.SaveChanges();
            }
        }


    }
}
