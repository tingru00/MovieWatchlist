using GameTournamentAPI.DTOs;
using GameTournamentAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameTournamentAPI.Controllers
{
     // Controller responsible for handling Tournament API endpoints
    [ApiController]
    [Route("api/[controller]")]
    public class TournamentController : ControllerBase
    {
        private readonly TournamentService _service;

        public TournamentController(TournamentService service)
        {
            _service = service;
        }

        //GET-endpoint -retrieves all tournaments
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? search)
        {
            var data = await _service.GetAllAsync(search);
            return Ok(data);
        }

        // GET endpoint -retrieves a specific tournament by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // POST endpoint -creates a new tournament
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TournamentCreateDTO dto)
        {
            var result = await _service.CreateAsync(dto);
            return Ok(result);
        }

        // PUT endpoint -updates an existing tournament by id
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TournamentUpdateDTO dto)
        {
            var success = await _service.UpdateAsync(id, dto);

            if (!success)
                return NotFound();

            return NoContent();
        }

        // DELETE endpoint -removes a tournament by id
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);

            if (!success)
                return NotFound();

            return NoContent();
        }

    }
}
