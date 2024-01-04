import { PropsWithChildren } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

type AccordionCardProps = {
  title: string;
  description: string;
};

const AccordionCard = ({
  title,
  description,
  children,
}: PropsWithChildren<AccordionCardProps>) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem className="border-none" value="item-1">
        <Card>
          <CardHeader>
            <AccordionTrigger>
              <CardTitle>{title}</CardTitle>
            </AccordionTrigger>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <AccordionContent>
            <CardContent className="pt-6 border-t border-zinc-800">
              {children}
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionCard;
