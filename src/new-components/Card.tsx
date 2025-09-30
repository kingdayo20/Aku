import { cva } from "class-variance-authority";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const iconVariants = cva("rounded-full p-2", {
  variants: {
    variant: {
      default: "bg-blue-100 text-blue-600",
      success: "bg-green-100 text-green-600",
      warning: "bg-yellow-100 text-yellow-600",
      danger: "bg-red-100 text-red-600",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Card = ({
  title,
  value,
  percentage,
  icon: Icon,
  variant,
}: {
  title: string;
  value: string;
  percentage: number;
  icon: React.ElementType;
  variant: "default" | "success" | "warning" | "danger";
}) => {
  const isPositive = percentage >= 0;
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={iconVariants({ variant })}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
        <div
          className={`mt-1 flex items-center text-sm ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 mr-1" />
          )}
          <span>{Math.abs(percentage)}%</span>
          <span className="ml-1 text-gray-500">since last month</span>
        </div>
      </div>
    </div>
  );
};

export default Card;