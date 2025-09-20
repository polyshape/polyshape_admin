import { Button } from "@polyutils/components";

type Props = {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  onRefresh: () => void;
  onAdd: () => void;
  isDeleting: boolean;
};

export default function ProjectsToolbar({
  searchQuery,
  setSearchQuery,
  onRefresh,
  onAdd,
  isDeleting,
}: Props) {
  return (
    <div className="list-toolbar">
      <div className="toolbar-left">
        <Button
          appearance="default"
          size="medium"
          shape="square"
          onClick={onRefresh}
          disabled={isDeleting}
          title="Refresh projects">
            <i className="fa-solid fa-rotate"></i>
            <span className="label">Refresh</span>
        </Button>
      </div>
      <div className="toolbar-search">
        <input
          type="search"
          placeholder="Search by title…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search projects by title"
        />
        <Button
          className="search-clear"
          appearance="transparent"
          size="small"
          aria-label="Clear search"
          onClick={() => setSearchQuery("")}
          style={{ visibility: searchQuery ? "visible" : "hidden" }}>
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </Button>
      </div>
      <div className="toolbar-right">
        <Button
          appearance="primary"
          size="medium"
          shape="square"
          onClick={onAdd}>
            <i className="fa-solid fa-plus"></i>
            <span className="label">Add</span>
        </Button>
      </div>
    </div>
  );
}
