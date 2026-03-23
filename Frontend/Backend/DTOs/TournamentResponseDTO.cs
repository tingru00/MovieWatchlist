namespace GameTournamentAPI.DTOs
{
    // DTO returned when retrieving tournament information
        public class TournamentResponseDTO
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Genre { get; set; }
            public string ImageUrl { get; set; }
            public DateTime Date { get; set; }
        }

    }

