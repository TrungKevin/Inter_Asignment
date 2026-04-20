package org.example.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PagedProfilesResponse {
  List<ProfileResponse> content;
  long totalElements;
  int totalPages;
  /** Trang hiện tại (0-based, giống Spring Data Page). */
  int page;
  int size;
  boolean first;
  boolean last;
}
