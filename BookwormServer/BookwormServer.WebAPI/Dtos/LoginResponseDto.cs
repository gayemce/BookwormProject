﻿namespace BookwormServer.WebAPI.Dtos;

public sealed record LoginResponseDto(
    string Token,
    int UserId,
    string UserName);
