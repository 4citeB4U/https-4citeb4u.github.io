import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  genres: string[];
  gradient: string;
  bubbleColor: string;
  content: string[][];
}

const LibraryPreview = () => {
  type ColorTheme = 'standard' | 'warm' | 'cool' | 'dark' | 'sepia';
  type ParticleDensity = 'none' | 'few' | 'normal' | 'many';
  type ParticleSize = 'small' | 'medium' | 'large';
  type AnimationSpeed = 'slow' | 'normal' | 'fast';
  type TextSize = 'small' | 'medium' | 'large' | 'xlarge';
  type VoiceOption = 'default' | 'female-1' | 'female-2' | 'female-3' | 'male-1';

  interface AppSettings {
    colorTheme: ColorTheme;
    particles: ParticleDensity;
    particleSize: ParticleSize;
    animationSpeed: AnimationSpeed;
    textSize: TextSize;
    voiceSpeed: number;
    voice: VoiceOption;
  }

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState<boolean>(false);
  const [isNarrating, setIsNarrating] = useState<boolean>(false);
  const [narratorMessage, setNarratorMessage] = useState<string>("");
  const [appSettings, setAppSettings] = useState<AppSettings>({
    colorTheme: 'standard',
    particles: 'normal',
    particleSize: 'large',
    animationSpeed: 'normal',
    textSize: 'large',
    voiceSpeed: 1.0,
    voice: 'default'
  });
  
  // Speech synthesis utility function
  const speakText = (text: string, rate: number = appSettings.voiceSpeed): Promise<void> => {
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not supported in this browser");
      return;
    }
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    
    // Get available voices
    let voices = window.speechSynthesis.getVoices();
    
    // If voices array is empty, try again after a short delay
    if (voices.length === 0) {
      setTimeout(() => {
        voices = window.speechSynthesis.getVoices();
      }, 100);
    }
    
    // Set voice based on settings
    if (appSettings.voice !== 'default') {
      const voiceMap: Record<VoiceOption, string> = {
        'default': '',
        'female-1': 'Samantha',
        'female-2': 'Victoria', 
        'female-3': 'Allison',
        'male-1': 'Daniel'
      };
      
      const voiceName = voiceMap[appSettings.voice];
      const selectedVoice = voices.find(v => v.name.includes(voiceName));
      if (selectedVoice) utterance.voice = selectedVoice;
    } else {
      // Prefer female voices if no specific voice is set
      const femaleVoice = voices.find(v => 
        v.name.includes('female') || 
        v.name.includes('Female') || 
        v.name.includes('Samantha') || 
        v.name.includes('Victoria')
      );
      if (femaleVoice) utterance.voice = femaleVoice;
    }
    
    return new Promise((resolve) => {
      utterance.onend = resolve;
      window.speechSynthesis.speak(utterance);
    });
  };
  
    interface ThemeStyles {
    background: string;
    text: string;
    headerText: string;
  }

// Get theme styles based on selected theme
  const getThemeStyles = (theme: ColorTheme): ThemeStyles => {
    switch (theme) {
      case 'warm':
        return {
          background: 'linear-gradient(135deg, #3a0000 0%, #260339 100%)',
          text: '#f8e3cb',
          headerText: '#ffb74d'
        };
      case 'cool':
        return {
          background: 'linear-gradient(135deg, #001a33 0%, #002b4d 100%)',
          text: '#e6f7ff',
          headerText: '#8ecdf7'
        };
      case 'dark':
        return {
          background: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
          text: '#c0c0c0',
          headerText: '#d4d4d4'
        };
      case 'sepia':
        return {
          background: 'linear-gradient(135deg, #f5eedd 0%, #e8ddbd 100%)',
          text: '#5c4b36',
          headerText: '#8a6d3b'
        };
      default: // standard
        return {
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          text: '#e0e0e0',
          headerText: '#ffc107'
        };
    }
  };
  
  const theme = getThemeStyles(appSettings.colorTheme as ColorTheme);

  const handleSettingChange = (setting: keyof AppSettings, value: string | number) => {
    setAppSettings(prev => ({
      ...prev,
      [setting]: setting === 'voiceSpeed' ? value : value as ColorTheme | ParticleDensity | ParticleSize | AnimationSpeed | TextSize | VoiceOption
    }));
  };
  
  // Enhanced book data with actual content
  const books = [
    {
      id: 'needle-and-yarn',
      title: "The Love Story of a Needle and a Yarn",
      author: "Leola Sister Lee",
      description: "A heartwarming tale of love between crafting tools. Follow Needle and Yarn as they navigate challenges, form deep bonds, and create beautiful projects together.",
      coverUrl: "/api/placeholder/600/800",
      genres: ["Fantasy", "Love Story", "Adventure", "DIY"],
      gradient: 'linear-gradient(135deg, #4361EE 0%, #7209B7 100%)',
      bubbleColor: '#7B61FF',
      content: [
        // Acknowledgment
        [
          "Acknowledgment",
          "Thank you for the love, lessons, and laughter that have shaped this journey. To my six remarkable children—Freddie, Micky, Timothy, Leonard, Jermaine, and Laron—you are the vibrant threads woven into the fabric of my life. Each of you brings unique strength, love, and creativity, and I am endlessly proud of you.",
          "This story is also a tribute to the resilient, diverse community of Milwaukee, Wisconsin, whose warmth and spirit have enriched my craft. May this tale reflect my passion for crochet and the enduring power of love."
        ],
        // Chapter 1
        [
          "Chapter 1: A Tangled Beginning",
          "Leola's sewing basket was a world unto itself, a community of tools bound by years of craft. Among them was Needle, an experienced crochet hook with a polished silver body, and Yarn, a vibrant ball of orange cotton, eager yet tangled. Needle had seen many projects in his time, guided by skilled hands through intricate patterns, but Yarn was new, uncertain of her purpose. She was excited yet anxious, wondering where she fit in this well-worn basket of seasoned tools.",
          "Leola, a warm-hearted woman with decades of crochet experience, had found both at a craft swap—Needle, a well-loved relic, and Yarn, a messy tangle waiting to be smoothed. Placing them together in her basket, she unknowingly set their journey in motion. When Yarn first spoke, her voice was bright, full of energy. \"Oh, dear, I seem to have gotten myself into a bit of a… mess.\"",
          "Needle chuckled. \"Nothing I haven't seen before. Let's get you sorted.\" As he worked through her knots with patient expertise, a bond formed. The other tools—Scissors, Thimble, and Measuring Tape—watched with interest. \"Looks like you've met your match, old friend,\" Scissors quipped. And in a way, he had."
        ],
        // Chapter 2
        [
          "Chapter 2: The First Dance",
          "With Yarn untangled, she was eager to create. \"Needle, I want to make something beautiful!\" she declared. He smiled at her enthusiasm. \"A scarf, perhaps? Simple, yet elegant.\" Yarn agreed, and Needle guided her through the first stitches—slip knot, chain stitch, then single crochet. Each movement was new to Yarn, her fibers tightening with uncertainty before finally settling into the rhythm of the work.",
          "At first, Yarn fumbled, her tension too tight, then too loose. Needle reassured her. \"It's all about rhythm. Find the flow.\" As she practiced, the stitches grew more even. Scissors, usually sharp-tongued, offered encouragement. \"Not bad, kid. Keep at it.\" Thimble, ever wise, nodded approvingly. Slowly but surely, the scarf took shape, a blend of reds and oranges forming a soft, flowing pattern.",
          "The scarf grew, a soft cascade of colors reflecting Yarn's newfound confidence. As Yarn moved with more ease, she shared her dreams. \"I want to dance, to move freely, to express myself.\" Needle, listening intently, realized he wanted to be part of that journey. She was more than just another ball of cotton—she was vibrant, alive. And he was falling for her."
        ],
        // Chapter 3
        [
          "Chapter 3: A Hat of Hopes",
          "As autumn's chill settled in, Yarn shivered. \"I wish I had something to keep my top warm.\" Needle grinned. \"A hat, then. We'll use the half-double crochet stitch—sturdy and warm.\" It was a new challenge, one that required patience and practice. But Yarn had grown stronger, and with Needle's guidance, she embraced the task, determined to create something both useful and beautiful.",
          "Yarn hesitated. \"Isn't that difficult?\" Thimble chimed in. \"Leola once made hats for her grandchildren, each unique, filled with love. Yours will be, too.\" Encouraged, Yarn learned the new stitch, slowly building confidence. She and Needle worked late into the night, their connection deepening with each loop. She imagined wrapping the hat around herself, a symbol of warmth and perseverance.",
          "But as they neared the final rows, disaster struck—Needle snagged on a knot, and with a sharp snap, his tip chipped. The tools gasped. Yarn panicked. \"Needle! Are you alright?\" He winced. \"I've… had better days.\" Leola, sensing the trouble, picked him up gently. \"Don't you worry, little friend. We'll fix you right up.\" And with that, she carried him away."
        ],
        // Chapter 4
        [
          "Chapter 4: Mended and Magnificent",
          "Yarn felt lost without Needle. She tried to finish the hat on her own, but the stitches felt wrong, uneven. Thimble comforted her. \"Needle is strong. He'll be back.\" She wanted to believe it, but without him, her confidence wavered. The unfinished hat sat in the basket, a reminder of how much she depended on him.",
          "Finally, Leola returned, holding Needle, now repaired. He gleamed, his tip polished smooth. \"Needle!\" Yarn cried, wrapping around him in relief. \"You're back!\" The tools gathered around, relieved to have their friend home. Needle smiled at Yarn's embrace, feeling stronger than before. \"I'm better than ever,\" he reassured her.",
          "Buoyed by joy, Yarn twirled, the finished hat swirling with her. \"Let's create something even bigger!\" she declared. She had found not just her skill, but her voice, her purpose. The tools celebrated together, reveling in the warmth of their craft and the friendships they had built."
        ],
        // Chapter 5
        [
          "Chapter 5: A Blanket of Dreams",
          "Their next project was their most ambitious yet—a blanket. \"Each square will hold a piece of our journey,\" Needle said. Yarn imagined a patchwork of colors, stories woven together. She wanted to create something lasting, something that could embrace others in warmth and love. The task felt daunting, but Needle was there, guiding her every step of the way.",
          "At first, her stitches were uneven, her color changes messy. Frustrated, she cried, \"I can't do it!\" Needle's voice was gentle. \"Even the best creations have knots and flaws. It's not about perfection, it's about love.\" With renewed determination, Yarn persisted, learning to embrace the imperfections. Each square, though not flawless, carried the essence of her heart and soul.",
          "Square by square, the blanket grew. When it was finally complete, it was a masterpiece of color and warmth, a testament to patience, creativity, and love. As Yarn draped it over Leola's chair, she whispered to Needle, \"We did it.\" Needle smiled. \"Yes, we did. Together.\" And in that moment, they knew—they had found their perfect stitch."
        ],
        // Epilogue
        [
          "Epilogue: Woven Together",
          "The sewing basket was never just a collection of tools—it was a family. Yarn and Needle, once strangers, had become inseparable, their work intertwined in every loop and stitch. The hat kept Yarn warm, the scarf flowed with her every dance, and the blanket became a symbol of their shared journey.",
          "Leola smiled as she admired their work, her hands tracing the stitches. \"Every creation tells a story,\" she murmured. And indeed, this one did—a story of patience, perseverance, and love. The tools rested together, basking in the satisfaction of a job well done.",
          "As the sun set, casting a golden glow over Leola's home, Yarn nestled beside Needle. \"What's next?\" she asked. Needle chuckled. \"Whatever we dream, my dear Yarn. Whatever we dream.\""
        ]
      ]
    },
    {
      id: 'crochet-mastery',
      title: "Crochet Mastery: A Complete Guide",
      author: "Leola Sister Lee",
      description: "A comprehensive guide to mastering the art of crochet. From basic stitches to complex techniques, this guide has everything you need to become a crochet master.",
      coverUrl: "/api/placeholder/600/800",
      genres: ["DIY", "Instruction", "Crafts", "Reference"],
      gradient: 'linear-gradient(135deg, #F72585 0%, #B5179E 100%)',
      bubbleColor: '#F5515F',
      content: [
        // Acknowledgment
        [
          "Acknowledgment",
          "This guide is dedicated to the crafters, dreamers, and makers who find joy in the art of crochet. To my children—Freddie, Micky, Timothy, Leonard, Jermaine, and Laron—your love and inspiration have woven strength into my life, just like every carefully placed stitch.",
          "And to the community of Milwaukee, whose resilience and warmth mirror the essence of handmade creations, thank you for shaping my journey. May this guide serve as a roadmap to creativity, patience, and the joy of crafting with love."
        ],
        // Chapter 1
        [
          "Chapter 1: The Essentials of Crochet",
          "Before diving into projects, it's important to understand the basic tools and techniques that make up the foundation of crochet. Here's what you need to get started:",
          "Tools & Materials:\n- Crochet Hook (Needle): Choose an aluminum, plastic, or wooden hook based on personal preference. Hook sizes vary, but a 5mm (H-8) hook is a great beginner size.\n- Yarn: Cotton, acrylic, or wool, depending on the project. Worsted weight is a versatile choice.\n- Scissors: For cutting yarn cleanly.\n- Measuring Tape: Ensures your projects are the correct size.\n- Stitch Markers: Helps track stitches in complex patterns.\n- Thimble (Optional): Useful for hand-sewing and weaving in ends.",
          "Basic Techniques:\n1. Slip Knot: The foundation of every crochet project. Wrap yarn around two fingers, pull through a loop, and tighten around your hook.\n2. Chain Stitch (ch): Creates the starting base of most projects.\n3. Single Crochet (sc): Insert hook into stitch, yarn over, pull through, yarn over again, pull through both loops.\n4. Half Double Crochet (hdc): Yarn over, insert hook into stitch, yarn over, pull through, yarn over again, pull through all three loops.\n5. Double Crochet (dc): Yarn over, insert hook, yarn over, pull through, yarn over, pull through two loops, yarn over, pull through the last two loops."
        ],
        // Chapter 2
        [
          "Chapter 2: Creating a Cozy Scarf",
          "A scarf is a perfect beginner project that introduces fundamental crochet skills.",
          "Materials Needed:\n- Worsted weight yarn (2-3 skeins, any color)\n- 5mm (H-8) crochet hook\n- Scissors\n- Tapestry needle for weaving in ends",
          "Instructions:\n1. Create a Foundation Chain: Chain 30 (or more for a wider scarf).\n2. First Row: Work a single crochet (sc) into the second chain from the hook. Continue across.\n3. Next Rows: Chain 1 at the end of each row, turn, and single crochet across until the scarf reaches your desired length.\n4. Finishing Touches: Fasten off and weave in any loose ends."
        ],
        // Chapter 3
        [
          "Chapter 3: Crafting a Warm Hat",
          "A hat is slightly more advanced, introducing circular crochet and increases.",
          "Materials Needed:\n- Worsted weight yarn (1-2 skeins)\n- 5mm (H-8) crochet hook\n- Stitch marker\n- Scissors\n- Tapestry needle",
          "Instructions:\n1. Magic Ring: Create a loop with yarn, insert hook, and pull up a loop.\n2. Round 1: Chain 2 (counts as first hdc), work 9 half double crochets (hdc) into the ring. Slip stitch to join.\n3. Round 2: Chain 2, 2 hdc in each stitch around (18 stitches total).\n4. Increasing Rounds: Continue increasing in this pattern, adding one more hdc between each increase in each round, until the hat fits your head diameter.\n5. Work Even: Once the crown is the right size, work even hdc rounds until the hat reaches your desired length.\n6. Finishing: Fasten off, weave in ends, and add a decorative edge if desired."
        ],
        // Chapter 4
        [
          "Chapter 4: Making a Beautiful Blanket",
          "A granny square blanket is a versatile and customizable project that lets you combine different colors and stitch patterns.",
          "Materials Needed:\n- Various colors of worsted weight yarn\n- 5mm (H-8) crochet hook\n- Scissors\n- Tapestry needle",
          "Instructions:\n1. Create a Magic Ring: Chain 3 (counts as first double crochet), work 2 double crochets (dc) into the ring.\n2. Chain 2: This forms a corner. Work 3 dc, chain 2, repeat two more times.\n3. Close the Round: Slip stitch to join.\n4. Increase the Square: Continue working 3 dc in each space along the sides and 3 dc, chain 2, 3 dc in each corner. Change colors as desired.\n5. Join Squares: Use slip stitch, single crochet, or whip stitch to join squares together.\n6. Finishing: Weave in ends and add a border if desired."
        ],
        // Chapter 5
        [
          "Chapter 5: Assembling Your Masterpieces",
          "Once you've completed each project, it's time to assemble and refine your work.",
          "Final Touches:\n- Blocking: Lightly mist projects with water and pin them to a flat surface to set the shape.\n- Weaving in Ends: Use a tapestry needle to hide yarn tails securely.\n- Adding Embellishments: Pom-poms, tassels, or buttons can personalize your creations.",
          "Tips for Success:\n- Keep consistent tension for even stitches.\n- Practice stitches before starting a big project.\n- Don't be afraid to undo and redo stitches for a cleaner look."
        ],
        // Epilogue
        [
          "Epilogue: The Art of Crochet",
          "Crochet is more than just loops and stitches—it is a form of storytelling, an expression of love and creativity. Each project carries the essence of the maker, just as Needle and Yarn discovered in their journey together. Whether crafting for yourself or gifting to others, every creation holds warmth, care, and dedication.",
          "As you continue to refine your skills, remember that even the most skilled crocheters started with a single loop. Keep learning, keep creating, and most of all—enjoy the process. Happy crocheting!"
        ]
      ]
    }
  ];
  
    interface NarratorStatusProps {
    isActive: boolean;
    message: string;
  }

// Narrator status indicator component
  const NarratorStatus = ({ isActive, message }: NarratorStatusProps) => {
    return (
      <div 
        className={`fixed bottom-4 left-4 px-4 py-2 rounded-lg text-white flex items-center z-50 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          background: isActive ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <span className="mr-2">
          {isActive ? '🔊' : '🔇'}
        </span>
        {message}
      </div>
    );
  };
  
    interface Particle {
    id: number;
    emoji: string;
    x: number;
    y: number;
    xSpeed: number;
    ySpeed: number;
    size: number;
    rotation: number;
    rotationSpeed: number;
  }

// Gentle floating crochet-related particles
  const Particles = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const animationFrameRef = useRef(null);
    
    useEffect(() => {
      // Determine number of particles based on settings
      let particleCount;
      switch (appSettings.particles) {
        case 'none': particleCount = 0; break;
        case 'few': particleCount = 8; break;
        case 'normal': particleCount = 15; break;
        case 'many': particleCount = 25; break;
        default: particleCount = 15;
      }
      
      // Only crochet-related tool emojis - removed rulers and star
      const craftEmojis = ['🧶', '🪡', '🧵', '✂️', '💕', '❤️', '💝', '💞'];
      
      // Create particles with random positions and gentle movement
      const newParticles = [];
      for (let i = 0; i < particleCount; i++) {
        const emoji = craftEmojis[i % craftEmojis.length];
        newParticles.push({
          id: i,
          emoji,
          x: Math.random() * 90 + 5, // random x position (%)
          y: Math.random() * 90 + 5, // random y position (%)
          xSpeed: (Math.random() * 2 - 1) * 0.15, // increased x speed
          ySpeed: (Math.random() * 2 - 1) * 0.15, // increased y speed
          size: 3 + Math.random() * 2, // larger size (3-5 rem)
          rotation: Math.random() * 360, // random initial rotation
          rotationSpeed: (Math.random() * 2 - 1) * 0.5 // increased rotation speed
        });
      }
      
      setParticles(newParticles);
      
      // Animation speed based on settings - more active but still controlled
      let speedMultiplier;
      switch (appSettings.animationSpeed) {
        case 'slow': speedMultiplier = 0.5; break;
        case 'normal': speedMultiplier = 0.8; break;
        case 'fast': speedMultiplier = 1.2; break;
        default: speedMultiplier = 0.8;
      }
      
      // Animation loop for gentle floating movement
      const moveParticles = () => {
        setParticles(prevParticles => {
          return prevParticles.map(particle => {
            // Update position with very gentle movement
            let newX = particle.x + particle.xSpeed * speedMultiplier;
            let newY = particle.y + particle.ySpeed * speedMultiplier;
            let newXSpeed = particle.xSpeed;
            let newYSpeed = particle.ySpeed;
            
            // Gentle direction changes when reaching edges
            if (newX < 2 || newX > 98) {
              // Softer bounce - gradually change direction
              newXSpeed = -newXSpeed * 0.8;
              // Move slightly away from edge to prevent sticking
              newX = newX < 2 ? 2.1 : 97.9;
            }
            
            if (newY < 2 || newY > 98) {
              // Softer bounce - gradually change direction
              newYSpeed = -newYSpeed * 0.8;
              // Move slightly away from edge to prevent sticking
              newY = newY < 2 ? 2.1 : 97.9;
            }
            
            // Add more random variation for more active movement
            newXSpeed += (Math.random() * 0.03 - 0.015) * speedMultiplier;
            newYSpeed += (Math.random() * 0.03 - 0.015) * speedMultiplier;
            
            // Slightly increased speed limits for more noticeable movement
            const maxSpeed = 0.25 * speedMultiplier;
            if (Math.abs(newXSpeed) > maxSpeed) newXSpeed = maxSpeed * Math.sign(newXSpeed);
            if (Math.abs(newYSpeed) > maxSpeed) newYSpeed = maxSpeed * Math.sign(newYSpeed);
            
            // Gentle rotation
            const newRotation = (particle.rotation + particle.rotationSpeed * speedMultiplier) % 360;
            
            return {
              ...particle,
              x: newX,
              y: newY,
              xSpeed: newXSpeed,
              ySpeed: newYSpeed,
              rotation: newRotation
            };
          });
        });
        
        animationFrameRef.current = requestAnimationFrame(moveParticles);
      };
      
      animationFrameRef.current = requestAnimationFrame(moveParticles);
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [appSettings.particles, appSettings.animationSpeed]);
    
    // Determine size based on settings
    let sizeMultiplier;
    switch (appSettings.particleSize) {
      case 'small': sizeMultiplier = 0.8; break;
      case 'medium': sizeMultiplier = 1.2; break;
      case 'large': sizeMultiplier = 1.8; break;
      default: sizeMultiplier = 1.2;
    }
    
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map(particle => (
          <div 
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${particle.size * sizeMultiplier}rem`,
              transform: `rotate(${particle.rotation}deg)`,
              transition: 'transform 0.8s ease, left 1.5s ease, top 1.5s ease',
              filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
              opacity: 0.9
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>
    );
  };

  // Settings Panel
  const SettingsPanel = () => {
    const [localSettings, setLocalSettings] = useState({...appSettings});
    
    const handleSave = () => {
      setAppSettings(localSettings);
      setShowSettingsPanel(false);
    };
    
    if (!showSettingsPanel) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-blue-500/30 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-blue-300">Library Settings</h2>
            <button 
              onClick={() => setShowSettingsPanel(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-8">
            {/* Color Theme */}
            <div>
              <h3 className="text-xl text-blue-200 mb-4">Color Theme</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {['standard', 'warm', 'cool', 'dark', 'sepia'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setLocalSettings({...localSettings, colorTheme: theme})}
                    className={`p-4 rounded-lg transition-all ${
                      localSettings.colorTheme === theme ? 'ring-4 ring-blue-500' : ''
                    }`}
                    style={{
                      background: 
                        theme === 'standard' ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' :
                        theme === 'warm' ? 'linear-gradient(135deg, #3a0000 0%, #260339 100%)' :
                        theme === 'cool' ? 'linear-gradient(135deg, #001a33 0%, #002b4d 100%)' :
                        theme === 'dark' ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)' :
                        'linear-gradient(135deg, #f9f3e5 0%, #e8ddbd 100%)'
                    }}
                  >
                    <div className="h-8 flex items-center justify-center">
                      <span className={`font-medium ${theme === 'sepia' ? 'text-gray-800' : 'text-white'}`}>
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Text Size */}
            <div>
              <h3 className="text-xl text-blue-200 mb-4">Reading Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Text Size</label>
                  <select 
                    value={localSettings.textSize}
                    onChange={(e) => setLocalSettings({...localSettings, textSize: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">Extra Large</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Reading Speed</label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={localSettings.voiceSpeed}
                      onChange={(e) => setLocalSettings({...localSettings, voiceSpeed: parseFloat(e.target.value)})}
                      className="w-full mr-3"
                    />
                    <span className="text-white">{localSettings.voiceSpeed.toFixed(1)}x</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Voice Settings */}
            <div>
              <h3 className="text-xl text-blue-200 mb-4">Narration Voice</h3>
              <select 
                value={localSettings.voice}
                onChange={(e) => setLocalSettings({...localSettings, voice: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
              >
                <option value="default">System Default</option>
                <option value="female-1">Samantha (Female)</option>
                <option value="female-2">Victoria (Female)</option>
                <option value="female-3">Allison (Female)</option>
                <option value="male-1">Daniel (Male)</option>
              </select>
              <div className="mt-4 bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                <span className="text-blue-200">💡 Tip:</span> 
                <span className="text-gray-300"> The app will automatically prioritize female voices by default.</span>
              </div>
            </div>
            
            {/* Particles */}
            <div>
              <h3 className="text-xl text-blue-200 mb-4">Background Elements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Particle Density</label>
                  <select 
                    value={localSettings.particles}
                    onChange={(e) => setLocalSettings({...localSettings, particles: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                  >
                    <option value="none">None</option>
                    <option value="few">Few</option>
                    <option value="normal">Normal</option>
                    <option value="many">Many</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Particle Size</label>
                  <select 
                    value={localSettings.particleSize}
                    onChange={(e) => setLocalSettings({...localSettings, particleSize: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Animation Speed</label>
                  <select 
                    value={localSettings.animationSpeed}
                    onChange={(e) => setLocalSettings({...localSettings, animationSpeed: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                  >
                    <option value="slow">Slow</option>
                    <option value="normal">Normal</option>
                    <option value="fast">Fast</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button 
              onClick={() => setShowSettingsPanel(false)}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Enhanced Book reader modal with real speech synthesis
  const BookReader = ({ book, onClose }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isReading, setIsReading] = useState(false);
    const [readerNarratorMessage, setReaderNarratorMessage] = useState("");
    const [showNarrationSettings, setShowNarrationSettings] = useState(false);
    
    const totalPages = book.content.length; // Total pages from our content
    
    // Text size based on settings
    const getTextSizeClass = () => {
      switch (appSettings.textSize) {
        case 'small': return 'text-base';
        case 'medium': return 'text-xl';
        case 'large': return 'text-2xl';
        case 'xlarge': return 'text-3xl';
        default: return 'text-xl';
      }
    };
    
    // Get theme styles for reader
    const readerTheme = (() => {
      switch (appSettings.colorTheme) {
        case 'warm':
          return {
            background: 'linear-gradient(135deg, #331c0c 0%, #38220f 100%)',
            text: '#ffebcc',
            headerText: '#ffb74d'
          };
        case 'cool':
          return {
            background: 'linear-gradient(135deg, #0a1929 0%, #102a43 100%)',
            text: '#d6f0ff',
            headerText: '#8ecdf7'
          };
        case 'dark':
          return {
            background: 'linear-gradient(135deg, #0d0d0d 0%, #141414 100%)',
            text: '#bcbcbc',
            headerText: '#d4d4d4'
          };
        case 'sepia':
          return {
            background: 'linear-gradient(135deg, #f7f1e3 0%, #efe5c4 100%)',
            text: '#5c4b36',
            headerText: '#8a6d3b'
          };
        default:
          return {
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            text: '#ffffff',
            headerText: '#ffc107'
          };
      }
    })();
    
    // Function to read the current page aloud
    const readCurrentPage = async () => {
      if (!isReading) {
        setIsReading(true);
        setReaderNarratorMessage(`Reading with voice: ${appSettings.voice === 'default' ? 'System Default' : appSettings.voice}`);
        
        const pageContent = book.content[currentPage];
        // Skip the title/heading when reading
        const textToRead = pageContent.slice(1).join(' ');
        
        try {
          await speakText(textToRead, appSettings.voiceSpeed);
          
          // After reading is complete, either go to next page or stop reading
          if (currentPage < totalPages - 1) {
            goToNextPage();
          } else {
            setIsReading(false);
            setReaderNarratorMessage("");
          }
        } catch (error) {
          console.error("Error during speech synthesis:", error);
          setIsReading(false);
          setReaderNarratorMessage("");
        }
      } else {
        // Stop reading
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        setIsReading(false);
        setReaderNarratorMessage("");
      }
    };
    
    // Enhanced page navigation
    const goToNextPage = () => {
      if (currentPage < totalPages - 1) {
        setCurrentPage(prevPage => prevPage + 1);
        if (isReading) {
          // If we were reading, start reading the new page
          setTimeout(() => {
            readCurrentPage();
          }, 500); // Short delay to update UI first
        }
      }
    };
    
    const goToPrevPage = () => {
      if (currentPage > 0) {
        // If we're currently reading, stop first
        if (isReading && window.speechSynthesis) {
          window.speechSynthesis.cancel();
          setIsReading(false);
          setReaderNarratorMessage("");
        }
        setCurrentPage(prevPage => prevPage - 1);
      }
    };
    
    // Clean up speech synthesis when component unmounts
    useEffect(() => {
      return () => {
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      };
    }, []);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div
          className="w-full h-full max-h-screen flex flex-col relative overflow-hidden rounded-lg"
          style={{
            background: readerTheme.background
          }}
        >
          <div className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="bg-red-600 hover:bg-red-500 text-white p-3 rounded-lg flex items-center gap-2"
              >
                <X size={20} />
                Close
              </button>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: readerTheme.headerText }}>{book.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowNarrationSettings(!showNarrationSettings)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg"
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  Reading Settings
                </span>
              </button>
              <button
                onClick={readCurrentPage}
                className={`px-4 py-3 rounded-lg text-white font-bold flex items-center gap-2 ${isReading ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
              >
                {isReading ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    Stop Reading
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    Start Reading
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Narration settings */}
          {showNarrationSettings && (
            <div className="bg-gray-800 p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">Reading Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl text-gray-300 mb-3">Display Theme</h4>
                    <div className="grid grid-cols-5 gap-3">
                      {['standard', 'warm', 'cool', 'dark', 'sepia'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => setAppSettings({...appSettings, colorTheme: theme})}
                          className={`p-3 rounded-lg transition-all ${
                            appSettings.colorTheme === theme ? 'ring-4 ring-blue-500' : ''
                          }`}
                          style={{
                            background: 
                              theme === 'standard' ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' :
                              theme === 'warm' ? 'linear-gradient(135deg, #3a0000 0%, #260339 100%)' :
                              theme === 'cool' ? 'linear-gradient(135deg, #001a33 0%, #002b4d 100%)' :
                              theme === 'dark' ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)' :
                              'linear-gradient(135deg, #f9f3e5 0%, #e8ddbd 100%)'
                          }}
                        >
                          <div className="h-8 flex items-center justify-center">
                            <span className={`font-medium ${theme === 'sepia' ? 'text-gray-800' : 'text-white'}`}>
                              {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                
                  <div>
                    <h4 className="text-xl text-gray-300 mb-3">Text Size</h4>
                    <div className="flex gap-3">
                      {['small', 'medium', 'large', 'xlarge'].map(size => (
                        <button
                          key={size}
                          onClick={() => setAppSettings({...appSettings, textSize: size})}
                          className={`px-4 py-3 rounded-lg flex-1 ${appSettings.textSize === size ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                        >
                          <span className={size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : size === 'large' ? 'text-lg' : 'text-xl'}>
                            {size.charAt(0).toUpperCase() + size.slice(1)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl text-gray-300 mb-3">Narration Voice</h4>
                    <select 
                      value={appSettings.voice}
                      onChange={(e) => setAppSettings({...appSettings, voice: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg text-lg"
                    >
                      <option value="default">System Default</option>
                      <option value="female-1">Samantha (Female)</option>
                      <option value="female-2">Victoria (Female)</option>
                      <option value="female-3">Allison (Female)</option>
                      <option value="male-1">Daniel (Male)</option>
                    </select>
                  </div>
                
                  <div>
                    <h4 className="text-xl text-gray-300 mb-3">Reading Speed: {appSettings.voiceSpeed.toFixed(1)}x</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-white">0.5x</span>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={appSettings.voiceSpeed}
                        onChange={(e) => setAppSettings({...appSettings, voiceSpeed: parseFloat(e.target.value)})}
                        className="flex-1"
                      />
                      <span className="text-white">2.0x</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-300 text-xl">💡</span>
                    <span className="text-gray-300">Settings are applied immediately and will be remembered for your next reading session.</span>
                  </div>
                </div>
                
                <div className="flex justify-end items-center">
                  <button 
                    onClick={() => setShowNarrationSettings(false)}
                    className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    Apply & Close Settings
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-grow overflow-hidden">
            <div className="flex items-center">
              <button 
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className="h-full px-6 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center disabled:opacity-30"
              >
                <ChevronLeft size={36} />
              </button>
            </div>
            
            <div className="flex-grow overflow-auto p-8">
              <div className={`${getTextSizeClass()} leading-relaxed max-w-5xl mx-auto`} style={{ color: readerTheme.text }}>
                {book.content[currentPage] && book.content[currentPage].map((paragraph, index) => {
                  if (index === 0) {
                    return (
                      <h3 key={index} className="text-4xl mb-8 font-bold" style={{ color: readerTheme.headerText }}>
                        {paragraph}
                      </h3>
                    );
                  } else {
                    // Handle formatting for bullet points and numbered lists
                    if (paragraph.includes('\n')) {
                      const lines = paragraph.split('\n');
                      return (
                        <div key={index} className="mb-6">
                          {lines.map((line, lineIndex) => {
                            // Check if it's a bullet point or numbered list
                            if (line.match(/^[0-9]+\./)) {
                              // Numbered list
                              return (
                                <p key={lineIndex} className="ml-6 mb-3">
                                  {line}
                                </p>
                              );
                            } else if (line.match(/^-/)) {
                              // Bullet list
                              return (
                                <p key={lineIndex} className="ml-6 mb-3">
                                  {line}
                                </p>
                              );
                            } else {
                              // Regular paragraph
                              return <p key={lineIndex} className="mb-3">{line}</p>;
                            }
                          })}
                        </div>
                      );
                    } else {
                      return (
                        <p key={index} className="mb-6">
                          {paragraph}
                        </p>
                      );
                    }
                  }
                })}
                <div className="flex justify-center mt-8 mb-12">
                  <span className="px-4 py-2 rounded-lg bg-gray-700 bg-opacity-40 text-base"
                    style={{ color: readerTheme.headerText }}>
                    {isReading ? 
                      "🔊 Reading in progress... Will automatically turn the page when finished." : 
                      "Click 'Start Reading' to have the story read aloud"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={goToNextPage}
                disabled={currentPage >= totalPages - 1}
                className="h-full px-6 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center disabled:opacity-30"
              >
                <ChevronRight size={36} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-800 border-t border-gray-700">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-lg ${currentPage === 0 ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
            >
              ← Previous Page
            </button>
            
            <div style={{ color: readerTheme.headerText }}>
              Page {currentPage + 1} of {totalPages}
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages - 1}
              className={`px-4 py-2 rounded-lg ${currentPage >= totalPages - 1 ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
            >
              Next Page →
            </button>
          </div>
          
          {/* Narrator status indicator */}
          {readerNarratorMessage && (
            <div 
              className="fixed bottom-4 left-4 px-4 py-2 rounded-lg text-white bg-green-600 flex items-center z-50"
              style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
              <span className="mr-2">🔊</span>
              {readerNarratorMessage}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Support modal
  const SupportModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div
          className="relative bg-gradient-to-b from-amber-800 to-amber-600 rounded-2xl p-10 max-w-lg w-full shadow-2xl"
          style={{
            transform: 'perspective(1000px) rotateX(5deg)',
            boxShadow: '0 20px 60px -10px rgba(255, 193, 7, 0.3), 0 0 30px rgba(255, 193, 7, 0.2)'
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-amber-200 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Heart className="text-red-400 w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-amber-100 mb-6">Support the Writer</h2>
            <div className="bg-amber-900/30 p-6 rounded-xl border border-amber-500/20 mb-8">
              <p className="text-xl text-amber-100 leading-relaxed italic">
                Thank you for supporting independent storytelling! Every stitch of my words is woven with love and care.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-amber-700 hover:bg-amber-600 text-white py-3 px-6 rounded-lg transition-colors shadow-lg">
                Buy Me Needle and Yarn
              </button>
              <button className="bg-red-700 hover:bg-red-600 text-white py-3 px-6 rounded-lg transition-colors shadow-lg">
                Donate via Patreon
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Smooth Scrolling Banner
  const ScrollingBanner = () => {
    return (
      <div className="relative w-full h-16 overflow-hidden flex items-center">
        <div
          className="absolute whitespace-nowrap font-serif text-3xl animate-marquee"
          style={{
            background: 'linear-gradient(90deg, #7e22ce, #fbbf24, #7e22ce)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            backgroundSize: '200% 100%',
            animationDuration: '20s'
          }}
        >
          Find joy in each stitch as your hands create what your heart imagines
        </div>
      </div>
    );
  };
  
  // Handle narration for book cards with real speech synthesis
  const handleBookNarration = (book) => {
    if (isNarrating) {
      // Stop narration
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsNarrating(false);
      setNarratorMessage("");
      return;
    }
    
    setIsNarrating(true);
    const voiceLabel = appSettings.voice === 'default' 
      ? 'System Default' 
      : appSettings.voice.replace('-', ' ').charAt(0).toUpperCase() + appSettings.voice.slice(1);
    
    setNarratorMessage(`Reading description with voice: ${voiceLabel}`);
    
    // Read the book description
    speakText(book.description, appSettings.voiceSpeed)
      .then(() => {
        setIsNarrating(false);
        setNarratorMessage("");
      })
      .catch(error => {
        console.error("Error in speech synthesis:", error);
        setIsNarrating(false);
        setNarratorMessage("");
      });
  };
  
  // Book Card Component with custom Cover rendering
  const BookCard = ({ book, onOpenBook }) => {
    const cardStyle = (() => {
      switch (appSettings.colorTheme) {
        case 'dark':
          return { background: 'rgba(30, 30, 30, 0.6)', color: '#c0c0c0' };
        case 'sepia':
          return { background: 'rgba(242, 232, 207, 0.8)', color: '#5c4b36' };
        case 'warm':
          return { background: 'rgba(58, 0, 0, 0.6)', color: '#f8e3cb' };
        case 'cool':
          return { background: 'rgba(0, 26, 51, 0.6)', color: '#e6f7ff' };
        default:
          return { background: 'rgba(26, 26, 46, 0.6)', color: '#e0e0e0' };
      }
    })();
    
    // Render specific book covers based on book id
    const renderBookCover = () => {
      if (book.id === 'crochet-mastery') {
        return (
          <div className="w-full h-full flex items-center justify-center bg-amber-50">
            <div className="relative w-full h-full" style={{ padding: '5%' }}>
              <div className="absolute inset-0 border-8 border-teal-700 m-4"></div>
              
              <div className="relative h-full w-full flex flex-col items-center justify-between py-4">
                <div className="text-center mt-4">
                  <div className="text-teal-700 text-xl font-serif">A COMPLETE GUIDE</div>
                  <div className="text-4xl font-bold text-center my-2 text-navy-900">CROCHET</div>
                  <div className="text-4xl font-bold text-center my-2 text-navy-900">MASTERY</div>
                </div>
                
                <div className="flex-grow flex items-center justify-center p-4">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-8 border-teal-500 bg-blue-100"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-24 h-8 bg-amber-100 rotate-45 rounded-full">
                        <div className="w-full h-full border-t-2 border-teal-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-700">BY</div>
                  <div className="text-lg font-bold text-gray-900">Leola Sister Lee</div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="w-full h-full flex items-center justify-center bg-rose-200">
            <div className="w-full h-full p-4 flex flex-col items-center">
              <div className="text-center mt-4">
                <div className="flex justify-center gap-1 mb-1">
                  <div className="text-teal-500 text-xl">❤</div>
                  <div className="text-black text-xl font-cursive">The Love Story of</div>
                  <div className="text-pink-500 text-xl">❤</div>
                </div>
                <div className="text-3xl font-bold text-black">a Needle and a Yarn</div>
              </div>
              
              <div className="flex-grow flex items-center justify-center gap-4 p-4">
                <div className="w-16 h-40 bg-teal-400 rounded-lg relative">
                  <div className="absolute top-6 w-6 h-6 bg-white rounded-full left-1/2 transform -translate-x-1/2">
                    <div className="absolute top-1/2 left-1/2 w-2 h-6 bg-black transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl">😊</div>
                </div>
                
                <div className="w-32 h-32 bg-teal-400 rounded-full relative flex items-center justify-center">
                  <div className="absolute w-24 h-24 border-4 border-teal-700 border-dashed rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl">😊</div>
                </div>
              </div>
              
              <div className="text-center mb-2">
                <div className="text-lg font-bold text-black">BY LEOLA SISTER LEE</div>
              </div>
            </div>
          </div>
        );
      }
    };
    
    return (
      <div
        className="relative rounded-lg overflow-hidden backdrop-blur-sm border border-gray-700 h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        style={{
          background: cardStyle.background,
          color: cardStyle.color
        }}
      >
        <div className="p-4 pb-2">
          <h3 className="text-4xl font-bold" style={{ color: book.bubbleColor }}>{book.title}</h3>
          <p className="text-xl flex items-center">
            by <span className="ml-2 mr-2" style={{
              color: '#a855f7',
              textShadow: '0 0 8px #a855f7, 0 0 15px #a855f7, 0 0 25px #a855f7'
            }}>{book.author}</span>
            <button 
              className={`ml-3 p-3 rounded-full transition-colors ${isNarrating ? 'bg-red-600 text-white' : 'bg-blue-700 text-white'}`}
              onClick={() => handleBookNarration(book)}
            >
              <Volume2 size={20} />
            </button>
          </p>
        </div>
        
        <div
          className="w-full aspect-[3/4] overflow-hidden transition-all duration-300 relative"
          style={{
            background: book.gradient
          }}
        >
          {book.id === 'needle-and-yarn' ? (
            <img 
              src="/api/v1/artifacts/needle-yarn-cover" 
              alt="The Love Story of a Needle and a Yarn" 
              className="w-full h-full object-cover"
            />
          ) : (
            renderBookCover()
          )}
        </div>
        
        <div className="p-4 pt-3 flex-grow">
          <p className="text-xl mb-3 leading-relaxed">
            {book.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {book.genres.map((genre, index) => {
              const colors = ['#FF6B6B', '#48BEFF', '#9775FA', '#4CAF50'];
              const color = colors[index % colors.length];
              
              return (
                <span
                  key={index}
                  className="inline-block rounded-full px-4 py-2 text-base font-medium"
                  style={{
                    backgroundColor: `${color}20`,
                    color: color,
                    border: `1px solid ${color}40`
                  }}
                >
                  {genre}
                </span>
              );
            })}
          </div>
        </div>
        
        <div className="p-4 pt-0 flex justify-center">
          <button
            onClick={() => onOpenBook(book)}
            className="w-full py-4 text-white rounded-lg font-bold text-xl shadow-lg"
            style={{ backgroundColor: book.bubbleColor }}
          >
            Open "{book.title}"
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: theme.background, color: theme.text }}>
      <Particles />
      
      <div className="relative z-10 p-6 pb-0">
        <div className="text-center mb-6">
          <h1 className="text-6xl font-bold" style={{ color: theme.headerText }}>
            Leola's Digital Library
          </h1>
          <p className="mt-4 text-2xl">
            A collection of heartwarming stories and guides by
            <span className="ml-2" style={{
              color: '#a855f7',
              textShadow: '0 0 8px #a855f7, 0 0 15px #a855f7, 0 0 25px #a855f7'
            }}>Leola "Sister" Lee</span>
          </p>
        </div>
        
        <div className="absolute top-8 left-8 flex flex-row gap-4">
          <button
            className="flex flex-col items-center justify-center hover:scale-110 transition-transform cursor-pointer bg-amber-900/30 p-4 rounded-xl border border-amber-500/30"
            onClick={() => setShowSupportModal(true)}
            style={{ width: '120px', height: '120px' }}
          >
            <span className="text-5xl">🎁</span>
            <span className="text-sm text-amber-300 mt-2 font-bold">Support Leola</span>
          </button>
          
          <button
            className="flex flex-col items-center justify-center hover:scale-110 transition-transform cursor-pointer bg-blue-800/60 p-4 rounded-xl border border-blue-400/60 shadow-lg"
            onClick={() => setShowSettingsPanel(true)}
            style={{
              boxShadow: '0 0 15px rgba(37, 99, 235, 0.5)',
              width: '120px',
              height: '120px'
            }}
          >
            <span className="text-5xl">⚙️</span>
            <span className="text-sm text-blue-200 mt-2 font-bold">Settings</span>
          </button>
        </div>
        
        <div className="mb-6">
          <ScrollingBanner />
        </div>
      </div>
      
      <div className="flex-grow relative z-10 px-6 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 px-12 md:px-24">
            {books.map(book => (
              <div key={book.id} className="h-full max-w-lg mx-auto">
                <BookCard
                  book={book}
                  onOpenBook={(book) => setSelectedBook(book)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedBook && (
        <BookReader
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
      
      {showSupportModal && (
        <SupportModal
          onClose={() => setShowSupportModal(false)}
        />
      )}
      
      <SettingsPanel />
      
      {/* Narrator status indicator - App level */}
      {narratorMessage && (
        <NarratorStatus isActive={isNarrating} message={narratorMessage} />
      )}
      
      {/* Custom fish-like animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LibraryPreview;
