# Gibbs Phenomenon

By Andy Pan (Qbane), 2016/3/10. (See [Gist](https://gist.github.com/andy0130tw/361531904c6909da8b86) for revision history.)

> This is a test document on MathJax support on various platforms, mainly on printed material.

For large $N$, the graph of the $N$th partial sum of the Fourier series of $f$ on $[-L, L]$ overshoots the graph of the function at a jump discontinuity by approx. $9\%$ of the magnitude of the jump.

## (a) $N$th Partial Sum
We write out the $N$th partial sum of the Fourier series of $f(x)$ and expand its coefficients:
$$ \begin{align}
S_N(x) &= a_0 + \sum_{n=1}^N \left[ a_n \cos \left(\frac{n\pi x}{L}\right) + b_n \sin \left(\frac{n\pi x}{L}\right) \right] \\
&= \frac{1}{2L} \int_{-L}^L f(t) dt \\
&+ \frac{1}{L} \sum_{n=1}^N \left[ \int_{-L}^L f(t) \cos\left( \frac{n\pi t}{L} \right) dt \right] \cos\left( \frac{n\pi x}{L} \right) \\
&+ \frac{1}{L} \sum_{n=1}^N \left[ \int_{-L}^L f(t) \sin\left( \frac{n\pi t}{L} \right) dt \right] \sin\left( \frac{n\pi x}{L} \right) \\
&= \frac{1}{L} \int_{-L}^L f(t) \left\{ \frac{1}{2} + \sum_{n=1}^N  \cos\left[ \frac{n\pi (t-x)}{L} \right] \right\} dt.
\end{align} $$

## (b) Trigonometric Identity
It can be shown that
$$\sum_{n=1}^N \cos (n\xi) = \frac{\sin \left[(N+\frac 1 2)\xi \right]}{2 \sin \left( \frac \xi 2 \right) } - \frac 1 2. $$

Here is a trick: multiply it by $\sin \left( \frac \xi 2 \right)$ and try to lead to an identity. It can also be simplified by transforming $\cos x = \frac{e^{ix} + e^{-ix}}{2}$ and transforming back to $\sin$ terms. (It would be tricky if you didn't know RHS, though.)

## (c) Approximating (a)
For small $x$, $\sin x \approx x $, and using (b), (a) can be expressed as
$$S_N(x) \approx \frac 1 {2L} \int_{-L}^L f(t) \frac{\sin \left[ \frac \pi L (N + \frac 1 2) (t-x) \right] }{ \frac{\pi}{2L}(t-x) } dt.
$$

## (d) Estimating a Discontinuity
To find out the amount, we use the following function with a jump discontinuity $1$ at $x = L$, $$ f(x) = \begin{cases}
0 & \text{if } -L < x \le x_0, \\
1 & \text{if } x_0 < x < L.
\end{cases} $$

Inserting it into $S_N$ yields
$$ \begin{align}
S_N(x) &\approx \frac 1 {2L} \int_{x_0}^L \frac{\sin \left[ \frac \pi L (N + \frac 1 2) (t-x) \right] }{ \frac{\pi}{2L}(t-x) } dt \\
&= \frac 1 \pi \int_{(\pi/L)(N + 1/2)(x_0-x)}^{(\pi/L)(N + 1/2)(L-x)} \frac{\sin s}{s} ds.
\end{align}$$

## (e) Putting $N \to \infty$
The integral $\int_0^z \frac{\sin t}{t} dt$ is called the sine integral, denoted as $\text{Si}(z)$.

Computing $S_N$ when $N \to \infty$ diverges to three cases depending on $x$, in which we are only interested in the case that $x > x_0$, that is $(\pi/L)(N + 1/2)(x_0-x) \to -\infty$:

$$ \begin{align}
\lim_{N \to \infty} S_N(x) &\approx \frac 1 \pi \int_{(\pi/L)(N + 1/2)(x_0-x)}^\infty \frac{\sin s}{s} ds \\
&= \frac 1 \pi \left\{ \lim_{z \to \infty} \text{Si}(z) - \text{Si} \left[ \left(\frac \pi L \right) \left(N + \frac 1 2 \right) \left(x_0-x \right) \right] \right\},
\end{align} $$

## (f) Evaluating the Sine Integral
$\text{Si}(z)$ at infinity can be computed as follows,
$$ \begin{align}
\lim_{z \to \infty} \text{Si}(z) &= \int_0^\infty \frac{\sin t}{t} dt \\
&= \int_0^\infty \int_0^\infty e^{-st} \frac{\sin t}{t}ds\,dt \\
&= \int_0^\infty \int_0^\infty e^{-st} \frac{\sin t}{t}dt\,ds \\
&= \int_0^\infty \frac{1}{s^2 + 1}ds \\
&= \frac \pi 2.
\end{align} $$

$\text{Si}(z)$ is maximized when $\text{Si}'(z^*) = 0$, that is $\frac{\sin z^*}{z^*} = 0$, and the minimal $x^*$ satisfying the condition is $z^* = \pi$.

Thus the overshoot is at most
$$
\frac 1 \pi \left[\frac \pi 2 - \text{Si}(\pi) \right] = \frac 1 2 - \frac{\text{Si}(\pi)}{\pi} \approx 0.0895,
$$

which is approximately $9\%$.

<!--$$\lim_{N \to \infty} S_N(x) \approx \begin{cases}
\int_\infty^\infty \frac{\sin t}{t} dt = 0, \text{if } x < x_0, \\
\end{cases}$$-->

> Written with [StackEdit](https://stackedit.io/).
