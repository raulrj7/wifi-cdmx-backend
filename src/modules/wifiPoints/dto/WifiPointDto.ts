import { IsInt, IsOptional, IsString, IsNumber, Min } from "class-validator";

export class GetWifiPointsDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}

export class GetWifiPointByIdDto {
  @IsInt()
  id!: number;
}

export class GetWifiPointsByDistrictDto {
  @IsString()
  district!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}

export class GetWifiPointsByProximityDto {
  @IsNumber()
  lat!: number;

  @IsNumber()
  lon!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}

export class GetWifiPointsByWifiIdDto {
  @IsString()
  wifi_id!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
