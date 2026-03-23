using GameTournamentAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GameTournamentAPI.Data
{
    // DbContext class responsible for database connection and entity configuration
    public class AppDbContext : DbContext
    {
        // Constructor used for dependency injection and database configuration
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        // Represents the Tournaments table in the database
        public DbSet<Movie> Tournaments { get; set; }
    }
}
