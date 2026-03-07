import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  action?: ReactNode;
}

function PageHeader({ title, subtitle, buttonText, buttonLink, action }: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {action && <div>{action}</div>}

        {buttonText && buttonLink && (
          <Link to={buttonLink}>
            <button className="btn-primary">
              <Plus size={16} />
              {buttonText}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default PageHeader;