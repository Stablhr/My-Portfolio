import { X, Heart, Mail, MessageSquare } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { profile } from "../../data/profile";

export function ExitModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="EXIT"
      size="md"
    >
      <div className="text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
          <Heart className="w-8 h-8 text-accent" aria-hidden="true" />
        </div>

        <div>
          <h3 className="font-heading text-chrome text-2xl mb-2">Thanks for visiting!</h3>
          <p className="text-ink-muted">
            Hope you enjoyed exploring my portfolio. Feel free to reach out if you'd like to work together or just say hello!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            onClick={() => {
              onClose();
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            icon={<MessageSquare className="w-5 h-5" />}
          >
            Contact Me
          </Button>
          <Button variant="outline" onClick={onClose}>
            Stay a While
          </Button>
        </div>

        <p className="text-xs text-ink-dim">
          Built with care by {profile.name} • {profile.year}
        </p>
      </div>
    </Modal>
  );
}