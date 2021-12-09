import React from "react";
import SearchIcon from "./src/search-icon.webp";
export const SearchItem = ({
  exist,
  catName,
  title,
  refers,
  searchResult,
  value,
  key,
  keyword,
}) => ({
  value: key,
  label: (
    <div
      style={{
        marginTop: -3,
        display: "flex",
        flexDirection: "row",
        borderColor: "white",
      }}
    >
      {!exist ? (
        <img
          src={SearchIcon}
          style={{ width: 25, height: 30, marginTop: -10 }}
        />
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: !exist ? 8 : 33,
        }}
      >
        {refers?.map((e) => {
          return (
            <div key={Math.random()} style={{ fontSize: 14, fontWeight: 600 }}>
              {e}
            </div>
          );
        })}
        <div
          dangerouslySetInnerHTML={{
            __html: searchResult
              .toString()
              .replace(
                keyword,
                `<span style="font-weight: bold">${keyword}</span>`
              ),
          }}
          style={{ fontSize: 12, marginTop: -5 }}
        ></div>
      </div>
    </div>
  ),
  id: value,
  catName: catName,
  key: key,
});
