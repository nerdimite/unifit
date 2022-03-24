import NextLink from "next/link";

export const Container = (props) => {
  return <div className="container mx-auto">{props.children}</div>;
};

export const Prose = (props) => {
  return (
    <div className="prose prose-slate max-w-none lg:prose-lg">
      {props.children}
    </div>
  );
};

export const Link = (props) => {
  return (
    <NextLink href={props.href}>
      <a className={props.className}>{props.children}</a>
    </NextLink>
  );
};

export const Card = (props) => {
  return (
    <div className={`shadow-xl rounded-md p-2 mb-4 ${props.className}`}>
      {props.children}
    </div>
  );
};
