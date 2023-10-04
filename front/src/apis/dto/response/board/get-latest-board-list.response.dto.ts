import { BoardListItem } from "types";
import ResponseDto from "..";

export default interface getLatestBoardListResponseDto extends ResponseDto {
    latestList: BoardListItem[];
}