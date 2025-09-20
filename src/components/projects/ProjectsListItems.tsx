import { Button } from "@polyutils/components";
import type { EnrichedItem } from "../../controllers/projectsController";
import { lastPathSegment } from "../../util/pathUtils";

type Props = {
  items: EnrichedItem[];
  deleting: Set<string>;
  onEdit: (item: EnrichedItem) => void;
  onDeleteRequest: (pathname: string) => void;
};

export default function ProjectsListItems({
  items,
  deleting,
  onEdit,
  onDeleteRequest,
}: Props) {
  return (
    <ul>
      {items.map((item) => {
        const key = item.pathname;
        const d = item.detail;
        return (
          <li key={key} className="list-item proj-item">
            <Button
              type="button"
              iconOnly
              className="icon-btn item-edit"
              size="small"
              shape="square"
              appearance="transparent"
              aria-label="Edit project"
              title="Edit project"
              onClick={() => onEdit(item)}
              icon={<i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>}/>
            <Button
              type="button"
              iconOnly
              className="icon-btn item-trash"
              size="small"
              shape="square"
              appearance="transparent"
              aria-label="Delete project"
              title="Delete project"
              onClick={() => onDeleteRequest(item.pathname)}
              aria-busy={deleting.has(item.pathname)}
              disabled={deleting.has(item.pathname)}
              icon={<i className="fa-solid fa-trash" aria-hidden="true"></i>}/>
            <h3 className="item-pathname proj-pathname" title={item.pathname}>
              {lastPathSegment(item.pathname)}
            </h3>
            {!d && item.error && (
              <p className="proj-error" style={{ color: "crimson" }}>
                Error: {item.error}
              </p>
            )}
            {d && (
              <div className="item-content proj-content">
                <div className="item-header proj-header">
                  <span className="item-date proj-date" title={d.date}>
                    {d.date}
                  </span>
                  <h2 className="item-title proj-title">{d.title}</h2>
                </div>
                <div className="item-meta proj-meta">
                  {d.partner?.name && (
                    <div className="item-extra proj-partner" title={d.partner.name}>
                      Partner:{" "}
                      {d.partner.url ? (
                        <a href={d.partner.url} target="_blank" rel="noreferrer">
                          {d.partner.name}
                        </a>
                      ) : (
                        d.partner.name
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
