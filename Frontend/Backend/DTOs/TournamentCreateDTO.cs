using System.ComponentModel.DataAnnotations;

namespace GameTournamentAPI.DTOs
{
    // DTO used for creating a new tournament via POST requests
    public class TournamentCreateDTO
    {
        // Tournament title (required, minimum 3 characters)
        [Required]
        [MinLength(3)]
        public string Title { get; set; }
        public string Description { get; set; }
        public string Genre { get; set; }
        public string ImageUrl { get; set; }
        // Date when the tournament will take place - Required and cannot be past date
        [Required]
        [FutureDate]
        public DateTime Date { get; set; }
    }
}
