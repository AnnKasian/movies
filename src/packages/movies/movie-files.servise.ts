import { AppException } from "../../libs/exceptions/exceptions.js";
import {
  MovieFormat,
  type MovieCreateDto,
  type MovieImportDto,
} from "./libs/types/types.js";

class MoviesFileService {
  readFile(data: MovieImportDto): string {
    if (!data || !data.file.buffer || data.file.size === 0) {
      throw new AppException("DATA_IN_FILE_REQUIRED", { data: "REQUIRED" });
    }

    return data.file.buffer.toString("utf8");
  }

  parseMovieFile(content: string): MovieCreateDto[] {
    const movies: MovieCreateDto[] = [];
    const movieBlocks = content
      .split(/(?=Title:)/)
      .filter((block) => block.trim());

    movieBlocks.forEach((block) => {
      const movie = this.parseMovieBlock(block.trim());

      if (movie) {
        movies.push(movie);
      }
    });

    return movies;
  }

  private parseMovieBlock(block: string): MovieCreateDto | null {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    let title = "";
    let year = 0;
    let format: "VHS" | "DVD" | "BluRay" | "" = "";
    let actors: string[] = [];

    for (const line of lines) {
      if (line.startsWith("Title:")) {
        title = line.replace("Title:", "").trim();
      } else if (line.startsWith("Release Year:")) {
        const yearStr = line.replace("Release Year:", "").trim();
        year = parseInt(yearStr) || 0;
      } else if (line.startsWith("Format:")) {
        const rawFormat = line.replace("Format:", "").trim();
        format = this.mapToValidFormat(rawFormat);
      } else if (line.startsWith("Stars:")) {
        const actorsString = line.replace("Stars:", "").trim();
        actors = this.parseActors(actorsString);
      }
    }

    if (!title || !year || !format || actors.length === 0) {
      throw new AppException("DATA_IN_FILE_NOT_VALID", { file: "NOT_VALID" });
    }

    return {
      title,
      year,
      format,
      actors,
    };
  }

  private mapToValidFormat(rawFormat: string): MovieFormat {
    const normalizedFormat = rawFormat.trim();

    switch (normalizedFormat) {
      case "VHS":
        return MovieFormat.VHS;
      case "DVD":
        return MovieFormat.DVD;
      case "Blu-Ray":
        return MovieFormat.BluRay;
      default:
        throw new AppException("FORMAT_NOT_VALID", { format: "NOT_VALID" });
    }
  }

  private parseActors(actorsString: string): string[] {
    return actorsString
      .split(",")
      .map((actor) => actor.trim())
      .filter((actor) => actor.length > 0);
  }
}

export { MoviesFileService };
