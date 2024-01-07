import { PropsWithChildren, ReactNode } from 'react';
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
  description?: string | ReactNode;
  id?: string;
  isOpenByDefault?: boolean;
};

const AccordionCard = ({
  title,
  description,
  id = 'item-1',
  isOpenByDefault = false,
  children,
}: PropsWithChildren<AccordionCardProps>) => {
  return (
    <Accordion
      type="single"
      defaultValue={isOpenByDefault ? id : undefined}
      collapsible
    >
      <AccordionItem className="border-none" value={id}>
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
