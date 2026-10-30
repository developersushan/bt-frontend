import Marquee from "react-fast-marquee";
import { Megaphone } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
const TopBannerHeader = () => {
  return (
    <Dialog>
      <DialogTrigger
        nativeButton={false}
        render={
          <div className="relative flex items-center mb-6 overflow-hidden rounded-full bg-[#002C35] sm:h-9 h-7 border border-[#0e5c55] select-none">
            {/* Fixed Left Megaphone Icon */}
            <div className="absolute left-0 z-20 flex items-center justify-center h-full pl-3 pr-2 bg-[#002C35] pointer-events-none">
              <Megaphone className="size-4.5 text-amber-400 fill-amber-400/20 -rotate-12 shrink-0" />
            </div>

            {/* Marquee with Scrollbar Hidden */}
            <Marquee
              speed={40}
              gradient={false}
              pauseOnHover={true}
              className="text-[#B88843] text-xs sm:text-sm font-medium leading-none overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
            >
              <span className="pl-12 pr-4 flex items-center gap-2">
                🎉🎉🎉 নতুন বছরের স্বপ্নের পরিকল্পনা আনুষ্ঠানিকভাবে চালু হয়েছে!
                এখনই যোগ দিন, ১০০% ওয়েলকাম বোনাস পান এবং প্রতিদিন জিতে নিন
                আকর্ষণীয় মেগা পুরস্কার! 🚀🔥💰
              </span>
            </Marquee>
          </div>
        }
      />
      <DialogContent className="sm:max-w-2xl text-white bg-primary-cyan border border-teal-foreground/30 max-h-100 overflow-y-scroll">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel corporis
        beatae officiis excepturi commodi impedit numquam? Voluptate ullam porro
        maxime, illo laudantium deleniti assumenda numquam et inventore magni
        veritatis laboriosam dignissimos quidem illum deserunt vitae incidunt
        facilis sequi totam? Aliquid libero atque delectus velit, aperiam
        perspiciatis. Repellat voluptas nemo officia nam eius voluptatum
        recusandae expedita, id cum excepturi vero amet quae laboriosam
        perferendis nulla iure fuga in molestiae accusantium tempore libero,
        delectus assumenda. Sit natus quasi, eaque impedit voluptate pariatur
        doloribus ad sed velit at repellat dolores obcaecati inventore nesciunt
        recusandae iure in distinctio maxime quos cumque mollitia quia?
        Sapiente, quis, praesentium veritatis facere placeat recusandae est
        molestiae provident magni ratione distinctio exercitationem maiores!
        Debitis, quae. Nisi autem maiores temporibus porro, officiis consectetur
        minima error amet aspernatur. Dignissimos in vel quasi nam eaque rerum
        ipsam iste? Rem molestiae velit consequatur veritatis iusto praesentium
        quae eaque incidunt libero? Accusantium voluptatibus quibusdam, laborum
        officia error, deleniti architecto ad praesentium, dignissimos maiores
        et dolorem quis! Sed, sapiente, illo dignissimos maiores molestias
        voluptas quam ut, neque accusantium quidem totam doloribus perspiciatis
        tempora nam incidunt culpa ex sequi atque molestiae quas porro a modi
        rem tenetur! Perspiciatis, tempora et numquam quis nisi impedit
        accusantium dolore suscipit exercitationem, explicabo aliquam blanditiis
        eveniet ea odio placeat doloribus aperiam expedita. Optio a deserunt
        amet, quia tempore ducimus nostrum. Temporibus corrupti ullam, laborum
        eveniet eius iste alias suscipit, blanditiis animi repellendus eligendi.
        Amet earum eligendi ullam sunt, possimus accusamus doloremque beatae
        dicta accusantium dolor aut eaque asperiores omnis voluptatem quasi
        magni at reprehenderit ea reiciendis enim illo. Labore suscipit nostrum
        nam. Voluptates fugit suscipit atque omnis quae consequatur alias eius?
        Ipsa repudiandae earum consectetur, minima ab, molestias reprehenderit
        eos placeat nulla repellat voluptatibus aliquid quam fugiat magnam
        accusamus consequuntur sit cupiditate asperiores consequatur voluptas
        laborum eum! Repudiandae asperiores ipsum obcaecati eligendi, aspernatur
        id beatae explicabo tenetur provident. Quibusdam eaque aspernatur
        architecto est quas qui maxime unde dignissimos quod. Voluptatibus,
        nostrum. Officiis, animi ducimus? Quibusdam molestiae doloribus id sit
        natus provident at voluptas sint asperiores perferendis non nihil
        obcaecati inventore
      </DialogContent>
    </Dialog>
  );
};

export default TopBannerHeader;
