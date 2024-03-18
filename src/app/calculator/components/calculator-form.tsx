"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({});

export function CalculatorForm() {
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  // 1. Define your form.
  const form = useForm();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // @ts-ignore
    let newValue = `Стоимость квеста: ${values.quest_cost}₽ (стоимость квеста до ${values.how_many_people} чел.)`;
    // @ts-ignore
    let sum = parseInt(values.quest_cost);

    // @ts-ignore
    if (values.additional_players_450) {
      // @ts-ignore
      sum += parseInt(values.additional_players_450) * 450;
      // @ts-ignore
      newValue += ` + ${parseInt(values.additional_players_450) * 450}₽ (${
        // @ts-ignore
        values.additional_players_450
      } доп. игр.)`;
    }
    // @ts-ignore
    if (values.additional_players_500) {
      // @ts-ignore
      sum += parseInt(values.additional_players_500) * 500;
      // @ts-ignore
      newValue += ` + ${parseInt(values.additional_players_500) * 500}₽ (${
        // @ts-ignore
        values.additional_players_500
      } доп. игр.)`;
    }
    // @ts-ignore
    if (values.discount_10 == true) {
      // @ts-ignore
      if (values.additional_players_450) {
        // @ts-ignore
        sum -=
          // @ts-ignore
          (parseInt(values.quest_cost) +
            // @ts-ignore
            parseInt(values.additional_players_450) * 450) *
          // @ts-ignore
          0.1;
        newValue += ` - ${
          // @ts-ignore
          (parseInt(values.quest_cost) +
            // @ts-ignore
            parseInt(values.additional_players_450) * 450) *
          // @ts-ignore
          0.1
        }₽ (скидка 10%)`;
      }
      // @ts-ignore
      if (values.additional_players_500) {
        sum -=
          // @ts-ignore
          (parseInt(values.quest_cost) +
            // @ts-ignore
            parseInt(values.additional_players_500) * 500) *
          0.1;
        newValue += ` - ${
          // @ts-ignore
          (parseInt(values.quest_cost) +
            // @ts-ignore
            parseInt(values.additional_players_500) * 500) *
          0.1
        }₽ (скидка 10%)`;
      }
      // @ts-ignore
      if (!values.additional_players_450 && !values.additional_players_500) {
        newValue += ` - ${
          // @ts-ignore
          parseInt(values.quest_cost) * 0.1
        }₽ (скидка 10%)`;
      }
    }
    // @ts-ignore
    if (values.second_actor) {
      // @ts-ignore
      sum += parseInt(values.second_actor);
      // @ts-ignore
      newValue += ` + ${values.second_actor}₽ (второй актер)`;
    }
    // @ts-ignore
    if (values.actors) {
      // @ts-ignore
      sum += parseInt(values.actors);
      // @ts-ignore
      newValue += ` + ${values.actors}₽ (актер)`;
    }
    // @ts-ignore
    if (values.video == true) {
      sum += 600;
      newValue += ` + 600₽ (видео)`;
    }
    // @ts-ignore
    if (values.room_for_one_hour_after) {
      // @ts-ignore
      sum += parseInt(values.room_for_one_hour_after);
      // @ts-ignore
      newValue += ` + ${values.room_for_one_hour_after}₽ (комната на один час после)`;
    }
    // @ts-ignore
    if (values.room_during_for_one_hour_after) {
      // @ts-ignore
      sum += parseInt(values.room_during_for_one_hour_after);
      // @ts-ignore
      newValue += ` + ${values.room_during_for_one_hour_after}₽ (комната во время квеста и на один час после)`;
    }
    // @ts-ignore
    if (values.night_game) {
      // @ts-ignore
      sum += parseInt(values.night_game);
      // @ts-ignore
      newValue += ` + ${values.night_game}₽ (ночная игра)`;
    }
    // @ts-ignore
    if (values.birthday_congr == true) {
      sum += 800;
      newValue += ` + 800₽ (поздравление именниника)`;
    }

    newValue += ` = ${sum}₽ - общая стоимость`;
    newValue += `<br /><br />${sum}₽ - 500₽ (предоплата) = ${
      sum - 500
    }₽ - оплата на месте`;

    setValue(newValue.replace(/<br\s*\/?>/g, "\n"));

    console.log(newValue);
  }

  // setValue(value.replace(/<br\s*\/?>/g, '\n'));

  const submitOnClick = () => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Текст скопирован",
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="quest_cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Стоимость квеста</FormLabel>
                  <FormControl>
                    <Input placeholder="3500" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="how_many_people"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>До скольки человек</FormLabel>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additional_players_450"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дополнительные игроки (450)</FormLabel>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additional_players_500"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дополнительные игроки (500)</FormLabel>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount_10"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Скидка 10%</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Да/Нет</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="second_actor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Второй актер</FormLabel>
                  <FormControl>
                    <Input placeholder="600" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="actors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Актеры</FormLabel>
                  <FormControl>
                    <Input placeholder="600" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="animator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Аниматор</FormLabel>
                  <FormControl>
                    <Input placeholder="600" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="video"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Видео</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Да/Нет</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="room_for_one_hour_after"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Комната на один час после</FormLabel>
                  <FormControl>
                    <Input placeholder="600" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="room_during_for_one_hour_after"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Комната во время час после</FormLabel>
                  <FormControl>
                    <Input placeholder="600" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="night_game"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ночная игра</FormLabel>
                  <FormControl>
                    <Input placeholder="600" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday_congr"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Поздравление именниника</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Да/Нет</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" onClick={() => setIsOpen(true)}>
            Создать
          </Button>
        </form>
      </Form>
      <Dialog open={isOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Скомпилированный текст</DialogTitle>
            <DialogDescription>
              Нажмите на кнопку, чтобы его скопировать
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: value,
                }}
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={submitOnClick}
            >
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsOpen(false)}
              >
                Закрыть
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
