using System.ComponentModel.DataAnnotations;

namespace GameTournamentAPI.DTOs
{
    // DTO used for updating a current tournament via PUT requests
    public class TournamentUpdateDTO
    {
        // Tournament title (required, minimum 3 characters)
        [Required]
        [MinLength(3)]
        public string Title { get; set; }

        public string Description { get; set; }

        public string Genre { get; set; }
        // Date when the tournament will take place - Required and cannot be past date
        [Required]
        [FutureDate]
        public DateTime Date { get; set; }
    }
}
