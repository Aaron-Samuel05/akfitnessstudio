'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';

type Props = { open: boolean; onClose: () => void };

export default function JoinModal({ open, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [plan, setPlan] = useState('Membership');

  if (!open) return null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="join-overlay" role="dialog" aria-modal="true" aria-labelledby="join-title">
      <div className="join-modal">
        <button className="join-close" onClick={onClose} aria-label="Close"><X /></button>
        {!submitted ? (
          <>
            <div className="join-kicker"><span /> MEMBERSHIP / 01</div>
            <h2 id="join-title">START<br /><em>NOW.</em></h2>
            <p className="join-intro">Tell us a little about yourself. We&apos;ll help you choose the right way to train at AK.</p>
            <form onSubmit={submit} className="join-form">
              <label>FULL NAME<input required name="name" autoComplete="name" placeholder="Your name" /></label>
              <div className="join-two">
                <label>PHONE<input required name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" /></label>
                <label>EMAIL<input required name="email" type="email" autoComplete="email" placeholder="you@email.com" /></label>
              </div>
              <label>WHAT ARE YOU LOOKING FOR?
                <select value={plan} onChange={(e) => setPlan(e.target.value)} name="membership">
                  <option>Membership</option><option>Personal Training</option><option>Strength Training</option><option>Conditioning</option><option>Sports Performance</option><option>Free Trial</option>
                </select>
              </label>
              <label>PRIMARY GOAL<select name="goal"><option>Build muscle</option><option>Lose fat</option><option>Get stronger</option><option>Improve fitness</option><option>Sports performance</option><option>Just get started</option></select></label>
              <button className="join-submit" type="submit">GET STARTED <ArrowUpRight size={18} /></button>
              <p className="join-note">By submitting, you&apos;re asking the AK team to contact you about membership and training options.</p>
            </form>
          </>
        ) : (
          <div className="join-success">
            <div className="success-icon"><Check /></div>
            <div className="join-kicker"><span /> REQUEST RECEIVED</div>
            <h2>YOU&apos;RE<br /><em>IN.</em></h2>
            <p>Thanks. Your details are ready for the AK team. We&apos;ll get in touch with the best next step for you.</p>
            <button className="join-submit" onClick={onClose}>BACK TO THE SITE <ArrowUpRight size={18} /></button>
          </div>
        )}
      </div>
    </div>
  );
}
