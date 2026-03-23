namespace GameTournamentAPI.Models
{
    // Entity model representing a movie stored in the database
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Genre { get; set; }
        public string ImageUrl { get; set; }
        public DateTime Date { get; set; }
    }
}
